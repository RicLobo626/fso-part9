import { RequestHandler, Response } from "express";
import { PublicPatient } from "../types";
import { patientService } from "../services";
import { parseNewPatient } from "../utils/parsers";

export const getPatients: RequestHandler = (_req, res: Response<PublicPatient[]>) => {
  const publicPatients = patientService.getPublicPatients();

  res.json(publicPatients);
};

export const addPatient: RequestHandler = (req, res: Response<PublicPatient>) => {
  const parsedNewPatient = parseNewPatient(req.body);

  const addedPatient = patientService.addPatient(parsedNewPatient);

  res.json(addedPatient);
};

export default {
  getPatients,
  addPatient,
};
