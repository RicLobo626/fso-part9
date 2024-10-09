import { RequestHandler, Response } from "express";
import { PublicPatient } from "../types";
import patientService from "../services/patients";

export const getPatients: RequestHandler = (
  _req,
  res: Response<PublicPatient[]>
) => {
  const publicPatients = patientService.getPublicPatients();

  res.json(publicPatients);
};

export default {
  getPatients,
};
