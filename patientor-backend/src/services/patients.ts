import patients from "../../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPublicPatient = ({ ssn: _, ...p }: Patient): PublicPatient => p;

const getPublicPatients = (): PublicPatient[] => patients.map(getPublicPatient);

const addPatient = (newPatient: NewPatient): PublicPatient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };

  patients.push(patient);

  return getPublicPatient(patient);
};

export default {
  addPatient,
  getPublicPatients,
};
