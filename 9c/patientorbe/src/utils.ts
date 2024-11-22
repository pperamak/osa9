import { Gender } from "./types";
import { NextFunction, Request, Response } from "express";
import { z } from 'zod';
import { NewPatient, HealthCheckRating, NewEntry } from "./types";

/*
export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // If the object doesn't have diagnosisCodes, return an empty array
    return [] as Array<Diagnosis["code"]>;
  }

  // Trust the data to be in the correct form
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
*/

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    criteria: z.string(),
  }),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
      endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
    })
    .optional(),
});

export const entrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});


export const toNewPatient = (object: unknown): NewPatient =>{
  return newPatientSchema.parse(object);
};

export const newPatientParser = (req: Request, _res: Response, next: NextFunction)=>{
  try {
    newPatientSchema.parse(req.body);
    next();
  }catch (error: unknown){
    next(error);
  }
};

export const newEntryParser = (data: unknown): NewEntry => {
  return entrySchema.parse(data); 
};

//export default   newPatientParser;
