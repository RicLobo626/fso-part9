import { ErrorRequestHandler, RequestHandler } from "express";
import { ParsingError } from "./parsers";
import { z } from "zod";
import { newPatientSchema } from "./schemas";

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
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

export const newPatientParser: RequestHandler = (req, _res, next) => {
  newPatientSchema.parse(req.body);

  next();
};
