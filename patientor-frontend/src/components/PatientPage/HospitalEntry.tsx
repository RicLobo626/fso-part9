import { Typography } from "@mui/material";
import { HospitalEntry as THospitalEntry } from "../../types";

type Props = {
  entry: THospitalEntry;
};

export const HospitalEntry = ({ entry }: Props) => {
  return (
    <Typography>
      <strong>Discharge:</strong> {entry.discharge.date} {entry.discharge.criteria}
    </Typography>
  );
};
