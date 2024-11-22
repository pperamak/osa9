export interface exerciseResult{
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface InputValues{
  target: number;
  hours: number[];
}

export const parseArguments = (args: string[]): InputValues =>{
 if (args.length < 4){
  throw new Error("Not enough arguments");
 } 

 const target = Number(args[2]);
 if (isNaN(target)){
  throw new Error("Target should be a number.");
 }

 const hours = args.slice(3).map(arg =>{
  const hour = Number(arg);
  if (isNaN(hour)){
    throw new Error(`Invalid number in exercise hours: ${arg}`);
  }
  return hour;
 });

 return{
  target: target,
  hours: hours
 };
};

export const calculateExercises = (hours: number[], target: number): exerciseResult=>{
  const periodLength=hours.length;
  const trainingDays=hours.filter((day)=> day > 0).length;
  const sum=hours.reduce((acc, cur) => {return acc + cur;}, 0);
  const average=sum / periodLength;
  const success= average >= target;
  let rating=0;
  let ratingDescription="";
  const ratio= (average/target)*100;
  if (ratio<50){
    rating=1;
    ratingDescription="the goals weren't met at all";
  }else if (ratio >= 50 && ratio < 100){
    rating=2;
    ratingDescription="not too bad but could be better";
  }else{
    rating=3;
    ratingDescription="you're a success!";
  }
  return{
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

if (require.main === module) {
try{
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises( hours, target));
}catch (error: unknown){
  let errorMessage ="Something bad happened.";
  if (error instanceof Error){
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
}
