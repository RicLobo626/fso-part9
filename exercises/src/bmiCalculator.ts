const calculateBmi = (heightCm: number, weightKg: number) => {
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

console.log(calculateBmi(175, 80));
