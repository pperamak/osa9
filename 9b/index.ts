import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req: Request, res: Response) => {
  // Extract height and weight from query parameters
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // Validate if height and weight are valid numbers
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      error: 'malformatted parameters'
    
    });
    return;
  }

  // Calculate the BMI and return the result
  const bmi = calculateBmi(height, weight);
  res.send({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const  { daily_exercises, target }: any = req.body;


  // Check if parameters are missing
  if (target === undefined|| daily_exercises === undefined) {
    res.status(400).json({ error: 'Parameters missing' });
    return; 
    
  }

  // Ensure daily_exercises is an array and target is a number
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    // Convert daily_exercises to numbers and validate
    
    const parsedHours = daily_exercises.map((hour: number) => {
      const parsedHour = Number(hour);
      if (isNaN(parsedHour)) {
        throw new Error('malformatted parameters');
      }
      return parsedHour;
    });

    // Calculate the result and return it
    const result = calculateExercises(parsedHours, Number(target));
    res.status(200).json(result);
  
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ error: errorMessage });
  
  }
 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
