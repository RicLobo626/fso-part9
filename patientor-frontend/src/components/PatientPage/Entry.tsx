import { Card, CardContent, Typography } from "@mui/material";
import { Diagnosis, Entry as TEntry } from "../../types";
import { EntryDetails } from "./EntryDetails";
import { EntryDiagnoses } from "./EntryDiagnoses";

type Props = {
  entry: TEntry;
  diagnoses: Diagnosis[];
};

export const Entry = ({ entry, diagnoses }: Props) => {
  return (
    <Card component="li" variant="outlined">
      <CardContent>
        <Typography>{entry.date}</Typography>

        <Typography component="em">{entry.description}</Typography>

        <EntryDetails entry={entry} />

        <Typography>Diagnose by {entry.specialist}</Typography>

        <EntryDiagnoses codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      </CardContent>
    </Card>
  );
};
