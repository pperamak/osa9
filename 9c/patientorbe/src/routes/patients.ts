import express from 'express';
import { NextFunction, Request, Response } from "express";
import  { getNonSensitivePatients, addPatient, findPatientById, addEntry }  from '../services/patientService';
import { NewPatient, NonSensitivePatient, Patient, NewEntry } from '../types';
import { newEntryParser, newPatientParser }   from '../utils';
import {z} from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) =>{
  res.send(getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient | undefined>) => {
  const patient = findPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) =>{
  const addedPatient = addPatient(req.body);
  res.json(addedPatient);
});

interface EntryParams {
  id: string;
}

router.post('/:id/entries', (req: Request<EntryParams, unknown, NewEntry>, res: Response)=>{
  try{
    console.log(req.body);
    const entry = newEntryParser(req.body);
    const updatedPatient = addEntry(req.params.id, entry);
    res.json(updatedPatient);
  }catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "Invalid data" });
    }
  }
  
});

router.use(errorMiddleware);

export default router;
