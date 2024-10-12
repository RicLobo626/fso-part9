export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

type BaseEntry = {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

type HealthCheckEntry = BaseEntry & {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

type HospitalEntry = BaseEntry & {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
};

type OccupationalHealthcareEntry = BaseEntry & {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, "id">;

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

export type NewPatient = Omit<Patient, "id" | "entries">;

export type PublicPatient = Omit<Patient, "ssn">;
