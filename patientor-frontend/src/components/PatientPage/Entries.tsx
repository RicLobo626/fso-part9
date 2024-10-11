import { Container } from "@mui/material";
import { Diagnosis, Entry as TEntry } from "../../types";
import { Entry } from "./Entry";

type Props = {
  entries: TEntry[];
  diagnoses: Diagnosis[];
};

export const Entries = ({ entries, diagnoses }: Props) => {
  if (entries.length === 0) {
    return <p>No entries</p>;
  }

  return (
    <Container component="ul" sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Container>
  );
};
