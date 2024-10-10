import express, { ErrorRequestHandler } from "express";
import "express-async-errors";
import cors from "cors";
import { diagnosesRouter, patientsRouter } from "./routes";
import { ParsingError } from "./utils/parsers";
import { z } from "zod";

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
  switch (true) {
    case error instanceof z.ZodError:
      res.status(400).json({ error: error.issues });
      break;
    case error instanceof ParsingError:
      res.status(400).json({ error: error.message });
      break;
    default:
      next(error);
  }
};

app.use(errorHandler);

export default app;
