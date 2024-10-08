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

export const parseValues = (height: unknown, weight: unknown): BmiValues => {
  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    height: heightNum,
    weight: weightNum,
  };
};

export const calculateBmi = (heightCm: number, weightKg: number): BmiCategory => {
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

if (require.main === module) {
  runWithCatch(() => {
    const parseArguments = (args: string[]): BmiValues => {
      const [, , ...values] = args;

      if (values.length < 2) throw new Error("Not enough arguments");
      if (values.length > 2) throw new Error("Too many arguments");

      const [height, weight] = values;

      return parseValues(height, weight);
    };

    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  });
}
