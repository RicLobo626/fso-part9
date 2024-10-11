// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  entries: Entry[];
};

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, "ssn">;
