import patients from "../../data/patients";
import { PublicPatient } from "../types";

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ ssn: _, ...p }) => p);
};

export default {
  getPublicPatients,
};
