import { runWithCatch } from "./helpers";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  hourList: number[];
  target: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  const [, , ...values] = args;

  if (values.length < 2) throw new Error("Not enough arguments");

  const numbers = values.map((v) => +v);
  const isValid = numbers.every((n) => !isNaN(n));

  if (!isValid) {
    throw new Error("Provided values must be valid numbers.");
  }

  const [target, ...hourList] = numbers;

  return { hourList, target };
};

const calculateExercises = (hourList: number[], target: number): Result => {
  const periodLength = hourList.length;
  const trainingDays = hourList.reduce((acc, h) => (h > 0 ? acc + 1 : acc), 0);
  const hourSum = hourList.reduce((acc, h) => acc + h, 0);
  const average = hourSum / periodLength;
  const success = average >= target;

  let rating = 1;

  if (average >= target) {
    rating = average === target ? 2 : 3;
  }

  let ratingDescription;

  switch (rating) {
    case 1:
      ratingDescription = "Need to work harder!";
      break;
    case 2:
      ratingDescription = "Not too bad but could be better.";
      break;
    default:
      ratingDescription = "Good job! Keep it up!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

runWithCatch(() => {
  const { hourList, target } = parseArguments(process.argv);
  console.log(calculateExercises(hourList, target));
});
