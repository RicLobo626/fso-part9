import { SyntheticEvent, useEffect, useState } from "react";
import { addDiaryEntry, getDiaryEntries } from "./services/diaryEntry";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { DiaryEntries, DiaryEntryForm } from "./components";
import { isAxiosError } from "axios";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const getAndSetDiaryEntries = async () => {
      const data = await getDiaryEntries();

      setDiaryEntries(data);
    };

    getAndSetDiaryEntries();
  }, []);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const body = Object.fromEntries(formData) as NewDiaryEntry;

    try {
      const data = await addDiaryEntry(body);

      setDiaryEntries(diaryEntries.concat(data));

      form.reset();
    } catch (e) {
      if (isAxiosError(e)) {
        setFormError(e.response?.data);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <>
      <h1>Flight Diary</h1>

      <DiaryEntryForm onSubmit={handleSubmit} error={formError} />

      <DiaryEntries diaryEntries={diaryEntries} />
    </>
  );
}

export default App;
