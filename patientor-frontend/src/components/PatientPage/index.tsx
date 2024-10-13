import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Diagnosis, Entry, NewEntry, Patient } from "../../types";
import patientService from "../../services/patients";
import { Button, Container, Typography } from "@mui/material";
import { Entries } from "./Entries";
import { Favorite, Female, LocalHospital, Male, MedicalServices, Transgender } from "@mui/icons-material";
import { EntryForm } from "./EntryForm";
import { isAxiosError } from "axios";

type Props = {
  diagnoses: Diagnosis[];
};

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [currentForm, setCurrentForm] = useState<Entry["type"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    const getAndSetPatient = async () => {
      const patient = await patientService.getPatient(id);

      setPatient(patient);
    };

    getAndSetPatient();
  }, []);

  if (!patient) {
    return <h2>Patient not found</h2>;
  }

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

  const handleChangeCurrentForm = (val: Entry["type"] | null) => () => setCurrentForm(val);

  const handleAddEntry = async (newEntry: NewEntry) => {
    try {
      const entry = await patientService.addEntry(patient.id, newEntry);

      setPatient({ ...patient, entries: patient.entries.concat(entry) });

      setCurrentForm(null);

      if (error) setError(null);
    } catch (e) {
      if (isAxiosError(e)) {
        const { path, message } = e.response?.data?.error?.[0] || {};

        setError(`Value of ${path[0]} is invalid: ${message}`);
      }
    }
  };

  return (
    <Container
      component="section"
      sx={{ paddingBlock: "16px", display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Typography variant="h2" fontSize="24px" fontWeight="bold">
        {patient.name} {getGenderIcon()}
      </Typography>

      <Container component="section" disableGutters>
        <Typography variant="h3" fontSize="20px">
          Details
        </Typography>

        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </Container>

      <Container component="section" disableGutters>
        <Typography variant="h3" fontSize="20px" marginBottom="16px">
          Add new entry
        </Typography>

        {currentForm && (
          <EntryForm
            onAddEntry={handleAddEntry}
            onCancel={handleChangeCurrentForm(null)}
            error={error}
            type={currentForm}
          />
        )}
        {!currentForm && (
          <Container
            disableGutters
            sx={{ paddingBlock: "16px", display: "flex", flexWrap: "wrap", gap: "8px" }}
          >
            <Button
              onClick={handleChangeCurrentForm("HealthCheck")}
              variant="contained"
              color="success"
              startIcon={<Favorite />}
            >
              HealthCheck
            </Button>

            <Button
              onClick={handleChangeCurrentForm("OccupationalHealthcare")}
              variant="contained"
              startIcon={<MedicalServices />}
            >
              OccupationalHealthcare
            </Button>

            <Button
              onClick={handleChangeCurrentForm("Hospital")}
              variant="contained"
              color="error"
              startIcon={<LocalHospital />}
            >
              Hospital
            </Button>
          </Container>
        )}
      </Container>

      <Container component="section" disableGutters>
        <Typography variant="h3" fontSize="20px">
          Entries
        </Typography>

        <Entries entries={patient.entries} diagnoses={diagnoses} />
      </Container>
    </Container>
  );
};

export default PatientPage;
