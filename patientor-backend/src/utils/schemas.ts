import { z } from "zod";
import { Gender } from "../types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  entries: z.array(z.object({})),
});
