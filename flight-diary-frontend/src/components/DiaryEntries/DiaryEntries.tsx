import { DiaryEntry } from "../../types";
import { Entry } from "./DiaryEntry";

type Props = {
  diaryEntries: DiaryEntry[];
};

export const DiaryEntries = ({ diaryEntries }: Props) => {
  return (
    <section>
      <h2>Diary Entries</h2>
      <ul>
        {diaryEntries.map((entry) => {
          return <Entry key={entry.id} entry={entry} />;
        })}
      </ul>
    </section>
  );
};
