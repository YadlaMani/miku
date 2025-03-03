import cors from "cors";
import express from "express";
import { prisma } from "../../packages/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
      type: "USER",
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
});
