export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  occupation: string;
  gender: string;
};

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, "ssn">;
