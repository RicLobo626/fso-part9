import { DiaryEntry } from "../../types";

type Props = {
  entry: DiaryEntry;
};

export const Entry = ({ entry }: Props) => {
  return (
    <li key={entry.id}>
      <h3>{entry.date}</h3>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
      <p>Comment: {entry.comment}</p>
    </li>
  );
};
