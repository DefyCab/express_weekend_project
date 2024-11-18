import express from "express";
import { createStudentsFeature } from "./features";
import cors from "cors";
import { createDB } from "./features/students/repository";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const db = createDB();

  // drizzle db
  const studentsFeature = createStudentsFeature(db);

  // well?
  app.get("/", (req, res) => {
    res.json([]);
  });

  app.use("/api/v1/students", studentsFeature.getRouter());

  return app;
};
