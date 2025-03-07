import cors from "cors";
import express from "express";
import { prisma } from "../../packages/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "./systemPrompt";
import { ArtifactProcessor } from "./parser";
import { onFileUpdate, onShellCommand } from "./os";
const app = express();
app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
app.post("/prompt", async (req, res) => {
  const { prompt, projectId } = req.body;
  await prisma.prompt.create({
    data: {
      content: prompt,
      projectId,
      type: "USER_PROMPT",
    },
  });
  const allPrompts = await prisma.prompt.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: allPrompts.map((prompt) => ({
        role: prompt.type === "USER_PROMPT" ? "user" : "ai",
        parts: [{ text: prompt.content }],
      })),
      generationConfig: {
        maxOutputTokens: 8000,
      },
    });
    let artifactProcessor = new ArtifactProcessor(
      "",
      (filePath, fileContent) => onFileUpdate(filePath, fileContent, projectId),
      (shellCommand) => onShellCommand(shellCommand, projectId)
    );
    let artifact = "";
    const response = await chat.sendMessage(systemPrompt);
    const message = response.response;
    const text = message.text();
    artifactProcessor.append(text);
    artifactProcessor.parse();
    artifact += text;
    await prisma.prompt.create({
      data: {
        content: artifact,
        projectId,
        type: "SYSTEM_PROMPT",
      },
    });
    await prisma.action.create({
      data: {
        content: "Done!",
        projectId,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
  res.json({ message: "Processing completed" });
});
app.listen(9091, () => {
  console.log("Worker is running on port 9091");
});
