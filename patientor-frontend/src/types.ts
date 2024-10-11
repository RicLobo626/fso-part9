export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

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

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
