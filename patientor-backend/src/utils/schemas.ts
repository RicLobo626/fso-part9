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
    description: z.string().min(3),
    date: z.string().date(),
    specialist: z.string().min(2),
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
      date: z.string().date(),
      criteria: z.string().min(2),
    })
    .strict(),
}).strict();

const OccupationalHealthcareEntrySchema = EntryBaseSchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .strict()
    .optional(),
}).strict();

export const newEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);
