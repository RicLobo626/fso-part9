import { Patient } from "../../types";
import { Female, Male, Transgender } from "@mui/icons-material";

type PatientInfoProps = {
  patient: Patient;
};

const PatientInfo = ({ patient }: PatientInfoProps) => {
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
      <h2>
        {patient.name} {getGenderIcon()}
      </h2>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  );
};

export default PatientInfo;
