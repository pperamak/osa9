import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Diagnosis, HealthCheckRating, Entry, NewEntry } from "../types";

interface AddEntryFormProps {
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onSubmit, onCancel, diagnoses }) => {
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleSubmit = () => {
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    let entry: NewEntry;

    switch (type) {
      case "HealthCheck":
        entry = { ...baseEntry, type, healthCheckRating };
        break;
      case "Hospital":
        entry = { ...baseEntry, type, discharge: { date: dischargeDate, criteria: dischargeCriteria } };
        break;
      case "OccupationalHealthcare":
        entry = {
          ...baseEntry,
          type,
          employerName,
          sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined,
        };
        break;
      default:
        return;
    }

    onSubmit(entry);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid black", marginBottom: 2 }}>
      <Typography variant="h6">Add New Entry</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as Entry["type"])}>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        margin="normal"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
          renderValue={(selected) => selected.join(", ")}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              <Checkbox checked={diagnosisCodes.includes(d.code)} />
              <ListItemText primary={`${d.code} - ${d.name}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type === "HealthCheck" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Health Check Rating</InputLabel>
          <Select
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
          >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>High Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}
      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            margin="normal"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </>
      )}
      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer Name"
            fullWidth
            margin="normal"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <TextField
            label="Sick Leave Start Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={sickLeaveStart}
            onChange={(e) => setSickLeaveStart(e.target.value)}
          />
          <TextField
            label="Sick Leave End Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={sickLeaveEnd}
            onChange={(e) => setSickLeaveEnd(e.target.value)}
          />
        </>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Entry
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;