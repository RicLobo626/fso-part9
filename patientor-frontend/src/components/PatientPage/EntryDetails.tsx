import { assertNever } from "../../helpers";
import { HealthCheckEntry } from "./HealthCheckEntry";
import { HospitalEntry } from "./HospitalEntry";
import { OccupationalHealthcareEntry } from "./OccupationalHealthcareEntry";
import { Entry } from "../../types";

type Props = {
  entry: Entry;
};

export const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};
