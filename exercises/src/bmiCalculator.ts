import { runWithCatch } from "./helpers";

type BmiCategory =
  | "Underweight"
  | "Normal (healthy weight)"
  | "Overweight"
  | "Obese";

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  const [, , ...values] = args;

  if (values.length < 2) throw new Error("Not enough arguments");
  if (values.length > 2) throw new Error("Too many arguments");

  const height = +values[0];
  const weight = +values[1];

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    height,
    weight,
  };
};

const calculateBmi = (heightCm: number, weightKg: number): BmiCategory => {
  if (isNaN(heightCm) || isNaN(weightKg)) {
    throw new Error("Provided values were not numbers!");
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi >= 18.5 && bmi < 25:
      return "Normal (healthy weight)";
    case bmi >= 25 && bmi < 30:
      return "Overweight";
    default:
      return "Obese";
  }
};

runWithCatch(() => {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
});
