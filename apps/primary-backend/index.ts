//external imports
import { prisma } from "db/client";
import { redisClient } from "redis/client";
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
//creating a project
app.post("/project", authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  const userId = req.userId!;
  //Todo :get good title for the prompt
  const dsecription = prompt.split("\n")[0];

  const project = await prisma.project.create({
    data: {
      dsecription,
      userId,
    },
  });
  res.json({
    projectId: project.id,
  });
});
//Get project end point

app.get("/projects", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const project = await prisma.project.findFirst({
    where: {
      userId,
    },
  });
  res.json(project);
});
