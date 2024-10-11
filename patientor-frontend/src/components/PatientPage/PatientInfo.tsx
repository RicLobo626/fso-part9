import { Diagnosis, Entry, Patient } from "../../types";
import { Female, Male, Transgender } from "@mui/icons-material";

type EntryDiagnosisProps = {
  code: Diagnosis["code"];
  diagnoses: Diagnosis[];
};

type EntryDiagnosesProps = {
  codes: Array<Diagnosis["code"]> | undefined;
  diagnoses: Diagnosis[];
};

type EntriesProps = {
  entries: Entry[];
  diagnoses: Diagnosis[];
};

type PatientInfoProps = {
  patient: Patient;
  diagnoses: Diagnosis[];
};

const EntryDiagnosis = ({ code, diagnoses }: EntryDiagnosisProps) => {
  const diagnosis = diagnoses.find((d) => d.code === code);

  return (
    <li>
      {code} {diagnosis?.name}
    </li>
  );
};

const EntryDiagnoses = ({ codes, diagnoses }: EntryDiagnosesProps) => {
  if (!codes) return null;

  return (
    <ul>
      {codes.map((code) => (
        <EntryDiagnosis key={code} code={code} diagnoses={diagnoses} />
      ))}
    </ul>
  );
};

const Entries = ({ entries, diagnoses }: EntriesProps) => {
  if (entries.length === 0) {
    return <p>No entries</p>;
  }

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <strong>{entry.date}</strong> {entry.description}
          <EntryDiagnoses codes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </li>
      ))}
    </ul>
  );
};

const PatientInfo = ({ patient, diagnoses }: PatientInfoProps) => {
  const getGenderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      default:
        return <Transgender />;
    }
  };

  return (
    <>
      <section>
        <h2>
          {patient.name} {getGenderIcon()}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </section>

      <section>
        <h3>Entries</h3>

        <Entries entries={patient.entries} diagnoses={diagnoses} />
      </section>
    </>
  );
};

export default PatientInfo;
