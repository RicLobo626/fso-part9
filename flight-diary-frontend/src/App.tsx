import { SyntheticEvent, useEffect, useState } from "react";
import { addDiaryEntry, getDiaryEntries } from "./services/diaryEntry";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { DiaryEntries, DiaryEntryForm } from "./components";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

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

    const data = await addDiaryEntry(body);

    setDiaryEntries(diaryEntries.concat(data));

    form.reset();
  };

  return (
    <>
      <h1>Flight Diary</h1>

      <DiaryEntryForm onSubmit={handleSubmit} />

      <DiaryEntries diaryEntries={diaryEntries} />
    </>
  );
}

export default App;
