import { useEffect, useState } from "react";
import { getDiaryEntries } from "./services/diaryEntry";
import { DiaryEntry } from "./types";
import { DiaryEntries } from "./components/DiaryEntries/DiaryEntries";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const getAndSetDiaryEntries = async () => {
      const data = await getDiaryEntries();

      setDiaryEntries(data);
    };

    getAndSetDiaryEntries();
  }, []);

  return (
    <>
      <h1>Flight Diary</h1>

      <DiaryEntries diaryEntries={diaryEntries} />
    </>
  );
}

export default App;
