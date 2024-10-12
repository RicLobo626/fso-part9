import patients from "../../data/patients";
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from "../types";
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

const addEntry = (id: string, newEntry: NewEntry): Entry | undefined => {
  const patient = getPatient(id);

  if (!patient) return;

  const entry = { ...newEntry, id: uuid() } as Entry;

  patient.entries.push(entry);

  return entry;
};

export default {
  addPatient,
  getPatient,
  addEntry,
  getPublicPatients,
  getPublicPatient,
};
