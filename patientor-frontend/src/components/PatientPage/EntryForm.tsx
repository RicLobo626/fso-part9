import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Entry, NewEntry } from "../../types";

type Props = {
  onAddEntry: (entry: NewEntry) => void;
  onCancel: () => void;
  type: Entry["type"];
};

export const EntryForm = ({ onAddEntry, onCancel, type }: Props) => {
  const [values, setValues] = useState<NewEntry>(() => {
    const basicFields = {
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
    };

    switch (type) {
      case "HealthCheck":
        return { ...basicFields, type, healthCheckRating: 0 };
      case "OccupationalHealthcare":
        return { ...basicFields, type, employerName: "" };
      case "Hospital":
        return { ...basicFields, type, discharge: { date: "", criteria: "" } };
    }
  });

  console.log(values.type === "OccupationalHealthcare" && values?.sickLeave);

  const diagnosisCodeList = ["M24.2", "M51.2", "S03.5", "J10.1", "J06.9", "Z57.1", "N30.0"];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddEntry(values);
  };

  const handleChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const handleChangeDiagnosisCodes = (e: SelectChangeEvent<string[]>) => {
    const val = e.target.value;
    setValues({ ...values, diagnosisCodes: typeof val === "string" ? val.split(",") : val });
  };

  const handleChangeHealthCheckRating = (e: SelectChangeEvent<number>) => {
    if (values.type !== "HealthCheck") return;

    setValues({ ...values, healthCheckRating: +e.target.value });
  };

  const handleChangeSickLeave =
    (field: "startDate" | "endDate") => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (values.type !== "OccupationalHealthcare") return;

      const val = e.target.value;

      if (field === "startDate" && !val) {
        const { sickLeave: _, ...rest } = values;
        setValues(rest);
      } else {
        const sickLeave = values.sickLeave || { startDate: "", endDate: "" };

        setValues({
          ...values,
          sickLeave: { ...sickLeave, [field]: val },
        });
      }
    };

  const handleChangeDischarge = (field: "date" | "criteria") => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (values.type !== "Hospital") return;

      setValues({
        ...values,
        discharge: { ...values.discharge, [field]: e.target.value },
      });
    };
  };

  return (
    <Card component="form" onSubmit={handleSubmit} variant="outlined" sx={{ maxWidth: "500px" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Typography
          variant="h4"
          fontSize="18px"
          fontWeight="medium"
          marginBottom="24px"
        >{`New ${type} Entry`}</Typography>

        <TextField
          onChange={handleChangeField("description")}
          value={values.description}
          label="Description"
          size="small"
        />

        <TextField
          onChange={handleChangeField("date")}
          value={values.date}
          label="Select Date"
          type="date"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          onChange={handleChangeField("specialist")}
          value={values.specialist}
          label="Specialist"
          size="small"
        />

        <FormControl size="small">
          <InputLabel>Diagnosis Codes</InputLabel>

          <Select
            multiple
            input={<OutlinedInput label="Chip" />}
            value={values.diagnosisCodes}
            onChange={handleChangeDiagnosisCodes}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((code) => (
                  <Chip key={code} label={code} />
                ))}
              </Box>
            )}
          >
            {diagnosisCodeList.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {values.type === "HealthCheck" && (
          <FormControl>
            <InputLabel>HealthCheck rating</InputLabel>
            <Select onChange={handleChangeHealthCheckRating} value={values.healthCheckRating} label="Age">
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low Risk</MenuItem>
              <MenuItem value={2}>High Risk</MenuItem>
              <MenuItem value={3}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {values.type === "OccupationalHealthcare" && (
          <>
            <TextField
              onChange={handleChangeField("employerName")}
              value={values.employerName}
              label="Employer Name"
              size="small"
            />
            <Container
              component="fieldset"
              sx={{ display: "flex", flexDirection: "column", gap: "12px", paddingBlock: "20px" }}
            >
              <Typography variant="h5" fontSize="16px" fontWeight="medium" component="legend">
                Sick leave
              </Typography>

              <TextField
                onChange={handleChangeSickLeave("startDate")}
                value={values.sickLeave?.startDate || ""}
                label="Start Date"
                type="date"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              {values.sickLeave?.startDate && (
                <TextField
                  onChange={handleChangeSickLeave("endDate")}
                  value={values.sickLeave?.endDate || ""}
                  label="End Date"
                  type="date"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              )}
            </Container>
          </>
        )}

        {values.type === "Hospital" && (
          <Container
            component="fieldset"
            sx={{ display: "flex", flexDirection: "column", gap: "12px", paddingBlock: "20px" }}
          >
            <Typography variant="h5" fontSize="16px" fontWeight="medium" component="legend">
              Discharge
            </Typography>

            <TextField
              onChange={handleChangeDischarge("date")}
              value={values.discharge.date}
              label="Date"
              type="date"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />

            <TextField
              onChange={handleChangeDischarge("criteria")}
              value={values.discharge.criteria}
              label="Criteria"
              size="small"
            />
          </Container>
        )}
      </CardContent>

      <CardActions>
        <Button type="submit" variant="contained">
          Add
        </Button>

        <Button onClick={onCancel} variant="outlined" color="error">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};
