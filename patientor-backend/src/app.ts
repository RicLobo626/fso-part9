import express, { ErrorRequestHandler } from "express";
import "express-async-errors";
import cors from "cors";
import { diagnosesRouter, patientsRouter } from "./routes";
import { ParsingError } from "./utils/parsers";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (error instanceof ParsingError) {
    res.status(400).json({ error: error.message });
    return;
  }

  next(error);
};

app.use(errorHandler);

export default app;
