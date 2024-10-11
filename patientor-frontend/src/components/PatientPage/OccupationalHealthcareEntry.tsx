import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry as TOccupationalHealthcareEntry } from "../../types";

type Props = {
  entry: TOccupationalHealthcareEntry;
};

export const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <>
      <Typography>
        <strong>{entry.employerName}</strong>
      </Typography>

      {entry.sickLeave && (
        <Typography>
          <strong>Sick leave:</strong> {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
      )}
    </>
  );
};
