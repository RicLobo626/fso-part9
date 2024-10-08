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
  dailyExercises: number[];
  target: number;
}

export const parseValues = (
  dailyExercises: unknown,
  target: unknown
): ExerciseValues => {
  if (!dailyExercises || !target) {
    throw new Error("Values are missing");
  }

  if (!Array.isArray(dailyExercises)) {
    throw new Error("Daily exercises value must be an array.");
  }

  const dailyExercisesNums = dailyExercises.map((v) => +v);

  const targetNum = +target;

  const isValid = !isNaN(targetNum) && dailyExercisesNums.every((n) => !isNaN(n));

  if (!isValid) {
    throw new Error("Provided values must be valid numbers.");
  }

  return {
    dailyExercises: dailyExercisesNums,
    target: targetNum,
  };
};

export const calculateExercises = (
  dailyExercises: number[],
  target: number
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.reduce((acc, h) => (h > 0 ? acc + 1 : acc), 0);
  const hourSum = dailyExercises.reduce((acc, h) => acc + h, 0);
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

if (require.main === module) {
  runWithCatch(() => {
    const parseArguments = (args: string[]): ExerciseValues => {
      const [, , ...values] = args;

      if (values.length < 2) throw new Error("Not enough arguments");

      const [target, ...dailyExercises] = values;

      return parseValues(dailyExercises, target);
    };

    const { dailyExercises, target } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
  });
}
