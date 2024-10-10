import axios from "axios";
import { DiaryEntry } from "../types";

const baseUrl = "/api/diaries";

export const getDiaryEntries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);

  return data;
};
