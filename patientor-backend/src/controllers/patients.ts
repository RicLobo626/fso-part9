import { Request, RequestHandler, Response } from "express";
import { NewEntry, NewPatient, PublicPatient } from "../types";
import { patientService } from "../services";

const getPatients: RequestHandler = (_req, res: Response<PublicPatient[]>) => {
  const publicPatients = patientService.getPublicPatients();

  res.json(publicPatients);
};

const getPatient: RequestHandler = (req, res: Response<PublicPatient>) => {
  const id = req.params.id;
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

const addEntry = (req: Request<{ id: string }, unknown, NewEntry>, res: Response) => {
  const patientId = req.params.id;

  const addedEntry = patientService.addEntry(patientId, req.body);

  if (addedEntry) {
    res.json(addedEntry);
  } else {
    res.status(404).end();
  }
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
