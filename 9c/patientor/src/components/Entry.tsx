import { Favorite, LocalHospital, MedicalServices, Work } from "@mui/icons-material";
import { Entry, Diagnosis, HealthCheckRating } from "../types";
import { Box, Typography } from "@mui/material";
import React from "react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const getHealthCheckRatingColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return "gray";
  }
};

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[]; // Pass diagnoses as a prop
}

const EntryDetails: React.FC<EntryDetailsProps>=({ entry, diagnoses })=>{
  const getDiagnosisName = (code: string): string | undefined => {
    return diagnoses.find((d) => d.code === code)?.name;
  };
  
  switch (entry.type){
    case "Hospital":
      return (
        <Box component="section" sx={{ p: 2, border: '1px solid black'}}>
          <Typography variant="body1">{entry.date}<LocalHospital/></Typography>
          <Typography variant="body1"><i>{entry.description}</i></Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code) ? `- ${getDiagnosisName(code)}` : ""}
                </li>
              ))}
            </ul>
          )}
          <Typography variant="body1">Discharge: {entry.discharge.date} {entry.discharge.criteria}</Typography>
          <Typography variant="body1">diagnose by {entry.specialist}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box component="section" sx={{ p: 2, border: '1px solid black'}}>
          <Typography variant="body1">{entry.date}<Work/>{entry.employerName}</Typography>
          <Typography variant="body1"><i>{entry.description}</i></Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code) ? `- ${getDiagnosisName(code)}` : ""}
                </li>
              ))}
            </ul>
          )}
          <Typography variant="body1">Sick leave:{" "} {entry.sickLeave?.startDate ? `${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}` : `-`}</Typography>
          <Typography variant="body1">diagnose by {entry.specialist}</Typography>
        </Box>
      );
      case "HealthCheck":
        return (
          <Box component="section" sx={{ p: 2, border: '1px solid black'}}>
            <Typography variant="body1">{entry.date}<MedicalServices/></Typography>
            <Typography variant="body1"><i>{entry.description}</i></Typography>
            {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code) ? `- ${getDiagnosisName(code)}` : ""}
                </li>
              ))}
            </ul>
          )}
          <Typography variant="body1">
            <Favorite style={{
              color: getHealthCheckRatingColor(entry.healthCheckRating)
            }}/>
            </Typography>
            <Typography variant="body1">diagnose by {entry.specialist}</Typography>
          </Box>
        );
        default:
          return assertNever(entry);
  }
};

export default EntryDetails;