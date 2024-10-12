import { z } from "zod";
import { Gender, HealthCheckRating } from "../types";

export const newPatientSchema = z
  .object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
  })
  .strict();

const EntryBaseSchema = z
  .object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
  })
  .strict();

const HealthCheckEntrySchema = EntryBaseSchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
}).strict();

const HospitalEntrySchema = EntryBaseSchema.extend({
  type: z.literal("Hospital"),
  discharge: z
    .object({
      date: z.string(),
      criteria: z.string(),
    })
    .strict(),
}).strict();

const OccupationalHealthcareEntrySchema = EntryBaseSchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .strict()
    .optional(),
}).strict();

export const newEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);
