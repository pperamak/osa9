import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService   from "../services/patients";
import { Patient, Diagnosis, NewEntry } from "../types";
import EntryDetails from "./Entry";
import AddEntryForm from "./AddEntryForm";
import { Button, Alert } from "@mui/material";

const PatientPage = () => {
  const [patient, setPatient]=useState<Patient>();
  const [showForm, setShowForm] =useState(false);
  const [error, setError] =useState<string | null>(null);
  const  { id } = useParams<{ id: string }>();
  const [diagnoses, setDiagnoses] =useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Check if `id` is defined

      try {
        const [fetchedPatient, fetchedDiagnoses] = await Promise.all([
          patientService.getById(id),
          patientService.getDiagnoses(),
        ]);
        setPatient(fetchedPatient);
        setDiagnoses(fetchedDiagnoses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    
    void fetchData();
   
  }, [id]);
  
  const handleAddEntry = async (entry: NewEntry) => {
    if (!id) return;

    try {
      const updatedPatient = await patientService.addEntry(id, entry);
      setPatient(updatedPatient); // Update patient data with the new entry
      setShowForm(false); // Hide the form
      setError(null); // Clear any previous error
    } catch (error: unknown) {
      console.error("Error adding entry:", error);
      if (error instanceof Error) {
        setError(error.message); // Display backend error message
      } else {
        setError("An unknown error occurred."); // Fallback error message
      }
    }
  };


  return (
    <div>
      {patient ? (
        <div>
          <h2>{patient.name}</h2>
          <p>Gender: {patient.gender}</p>
          <p>Date of Birth: {patient.dateOfBirth}</p>
          <p>Occupation: {patient.occupation}</p>
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Add Entry
          </Button>
          {showForm && (
            <div>
              {error && (
                <Alert severity="error" style={{ marginBottom: "1rem" }}>
                  {error}
                </Alert>
              )}
              <AddEntryForm
                onSubmit={handleAddEntry}
                onCancel={() => {
                  setShowForm(false);
                  setError(null); 
                }}
                diagnoses={diagnoses}
              />
            </div>
          )}
          <br/>
          <b>Entries</b><br/>
          
          {patient.entries.map((entry) =>(
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
          ))}
          
        </div>
      ) : (
        <p>Loading patient data...</p>
      )}
    </div>
  );
};

export default PatientPage;