//external imports
import { prisma } from "../../packages/db";
import { redisClient } from "../../packages/redis";
import cors from "cors";
import express from "express";
//internal imports
import { authMiddleware } from "./middleware";
const app = express();
app.use(express.json());
app.use(cors());
app.listen("5555", () => {
  console.log("Server is running on port 5555");
});
app.get("/", (req, res) => {
  res.send("Sever is alive");
});
//creating a project
app.post("/project", authMiddleware, async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId!;

    //Todo :get good title for the prompt
    const description = prompt.split("\n")[0];

    const project = await prisma.project.create({
      data: {
        description,
        userId,
      },
    });

    res.status(200).json({
      message: "Project created successfully",
      projectId: project.id,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
      success: false,
    });
  }
});
//Get project end point

app.get("/projects", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });
  console.log(projects);
  res.json({
    projects: projects,
  });
});
