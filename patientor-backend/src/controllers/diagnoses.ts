import { RequestHandler, Response } from "express";
import { Diagnosis } from "../types";
import diagnosisService from "../services/diagnosis";

const getDiagnoses: RequestHandler = (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosisService.getDiagnoses();

  res.json(diagnoses);
};

export default {
  getDiagnoses,
};
