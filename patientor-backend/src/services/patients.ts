import patients from "../../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";
import { v1 as uuid } from "uuid";

const convertToPublicPatient = ({ ssn: _, ...p }: Patient): PublicPatient => p;

const getPublicPatients = (): PublicPatient[] => patients.map(convertToPublicPatient);

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getPublicPatient = (id: string): PublicPatient | undefined => {
  const patient = getPatient(id);

  return patient && convertToPublicPatient(patient);
};

const addPatient = (newPatient: NewPatient): PublicPatient => {
  const patient: Patient = {
    id: uuid(),
    entries: [],
    ...newPatient,
  };

  patients.push(patient);

  return convertToPublicPatient(patient);
};

export default {
  addPatient,
  getPatient,
  getPublicPatients,
  getPublicPatient,
};
