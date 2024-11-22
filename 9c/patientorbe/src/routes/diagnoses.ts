import express from 'express';
import getDiagnoses from '../services/diagnosisService';
import { Response } from 'express';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) =>{
  res.send(getDiagnoses());
});

export default router;