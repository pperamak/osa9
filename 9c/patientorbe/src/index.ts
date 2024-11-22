import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);

/*
app.use((req, res) => {
  console.error(`Unhandled route: ${req.method} ${req.url}`);
  res.status(404).send('Not Found');
});
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});