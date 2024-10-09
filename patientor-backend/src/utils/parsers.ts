import { NewPatient } from "../types";
import { isObject, isString, isDate } from "./validators";

export class ParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParsingError";
  }
}

export const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new ParsingError("Incorrect or missing string: " + text);
  }

  return text;
};

export const parseDate = (date: unknown): string => {
  if (!isDate(date)) {
    throw new ParsingError("Incorrect or missing date: " + date);
  }

  return date;
};

export const parseNewPatient = (obj: unknown): NewPatient => {
  if (!isObject(obj)) {
    throw new ParsingError("Incorrect or missing data");
  }

  const hasFields =
    "name" in obj && "dateOfBirth" in obj && "occupation" in obj && "ssn" in obj && "gender" in obj;

  if (!hasFields) {
    throw new ParsingError("Incorrect data: some fields are missing");
  }

  return {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    occupation: parseString(obj.occupation),
    gender: parseString(obj.gender),
  };
};