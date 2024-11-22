//import { z } from 'zod';
//import  newPatientSchema  from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry{
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?:{
    startDate: string;
    endDate: string;
  }
}

interface HospitalEntry extends BaseEntry{
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

interface HealthCheckEntry extends BaseEntry{
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]  
}


//export type NewPatient = z.infer<typeof newPatientSchema>;
export type NewPatient=Omit<Patient, 'id' | 'entries'>;

export type NonSensitivePatient=Omit<Patient, 'ssn' | 'entries'>;