import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import PatientInfo from "./PatientInfo";
import patientService from "../../services/patients";

type Props = {
  diagnoses: Diagnosis[];
};

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    const getAndSetPatient = async () => {
      const patient = await patientService.getPatient(id);

      setPatient(patient);
    };

    getAndSetPatient();
  }, []);

  return (
    <section>
      {patient ? <PatientInfo patient={patient} diagnoses={diagnoses} /> : <h2>Patient not found</h2>}
    </section>
  );
};

export default PatientPage;
