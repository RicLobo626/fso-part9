import express from "express";
import cors from "cors";
import { diagnosesRouter, patientsRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

export default app;
