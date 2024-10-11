import { Request, RequestHandler, Response } from "express";
import { NewPatient, PublicPatient } from "../types";
import { patientService } from "../services";

const getPatients: RequestHandler = (_req, res: Response<PublicPatient[]>) => {
  const publicPatients = patientService.getPublicPatients();

  res.json(publicPatients);
};

const getPatient: RequestHandler = (_req, res: Response<PublicPatient>) => {
  const { id } = _req.params;
  const publicPatient = patientService.getPatient(id);

  if (publicPatient) {
    res.json(publicPatient);
  } else {
    res.status(404).end();
  }
};

const addPatient: RequestHandler = (
  req: Request<unknown, unknown, NewPatient>,
  res: Response<PublicPatient>
) => {
  const addedPatient = patientService.addPatient(req.body);

  res.json(addedPatient);
};

export default {
  getPatients,
  addPatient,
  getPatient,
};
