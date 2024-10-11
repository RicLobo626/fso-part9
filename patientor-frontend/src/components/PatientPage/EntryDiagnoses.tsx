import { Typography } from "@mui/material";
import { Diagnosis } from "../../types";

type Props = {
  codes: Array<Diagnosis["code"]> | undefined;
  diagnoses: Diagnosis[];
};

export const EntryDiagnoses = ({ codes, diagnoses }: Props) => {
  if (!codes) return null;

  const getDiagnosisName = (code: Diagnosis["code"]) => {
    const diagnosis = diagnoses.find((d) => d.code === code);

    return diagnosis?.name;
  };

  return (
    <ul>
      {codes.map((code) => (
        <Typography key={code} component="li">
          {code} {getDiagnosisName(code)}
        </Typography>
      ))}
    </ul>
  );
};
