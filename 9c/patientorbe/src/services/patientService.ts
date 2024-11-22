import patients from '../../data/patients';
import patientData from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

export const getNonSensitivePatients = (): NonSensitivePatient[] =>{
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) =>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

/*
export const getPatients = (): Patient[] =>{
  return patientData;
};
*/

export const addPatient = ( patient: NewPatient ): Patient =>{
  const uid = uuid();
  const newPatient = {
    id: uid,
    ...patient,
    entries: []
  };
  patientData.push(newPatient);
  return newPatient;
};

export const addEntry = (patientId: string, entry: NewEntry): Patient =>{
  const patient = patients.find(p=>p.id === patientId);
  if (!patient) {
    throw new Error(`Patient with ID ${patientId} not found`);
  }
  const uid = uuid();
  const newEntry: Entry = {
    ...entry,
    id: uid, 
  };
  patient.entries.push(newEntry);

  return patient;
};

export const findPatientById = (id: string): Patient | undefined => {
  const patient = patientData.find(d => d.id === id);
  return patient;
};

