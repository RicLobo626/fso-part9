interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hourList: number[], target: number) => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
