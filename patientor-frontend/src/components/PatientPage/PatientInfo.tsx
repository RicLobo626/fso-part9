import { Diagnosis, Patient } from "../../types";
import { Female, Male, Transgender } from "@mui/icons-material";
import { Entries } from "./Entries";

type Props = {
  patient: Patient;
  diagnoses: Diagnosis[];
};

const PatientInfo = ({ patient, diagnoses }: Props) => {
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
