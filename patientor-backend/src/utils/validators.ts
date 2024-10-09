import { Gender } from "../types";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: unknown): date is string => {
  return isString(date) && Boolean(Date.parse(date));
};

export const isGender = (gender: unknown): gender is Gender => {
  return isString(gender) && Object.values(Gender).map(String).includes(gender);
};

export const isObject = (obj: unknown): obj is object => {
  return obj !== null && typeof obj === "object";
};
