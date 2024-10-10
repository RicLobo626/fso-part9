import express from "express";
import "express-async-errors";
import cors from "cors";
import { diagnosesRouter, patientsRouter } from "./routes";
import { errorHandler } from "./utils/middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use(errorHandler);

export default app;
