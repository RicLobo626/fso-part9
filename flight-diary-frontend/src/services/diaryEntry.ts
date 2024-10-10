import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "/api/diaries";

export const getDiaryEntries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);

  return data;
};

export const addDiaryEntry = async (body: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, body);

  return data;
};
