import express from "express";
import { calculateBmi, parseValues } from "./bmiCalculator";
import {
  calculateExercises,
  parseValues as parseExerciseValues,
} from "./exerciseCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const query = req.query;

    const { height, weight } = parseValues(query.height, query.weight);

    const bmi = calculateBmi(height, weight);

    res.send({
      weight,
      height,
      bmi,
    });
  } catch {
    res.json({ error: "malformatted parameters" });
  }
});

app.use(express.json());

app.post("/exercises", (req, res, next) => {
  const body = req.body as { daily_exercises: unknown; target: unknown };

  try {
    const { dailyExercises, target } = parseExerciseValues(
      body.daily_exercises,
      body.target
    );

    const result = calculateExercises(dailyExercises, target);

    res.json(result);
  } catch (e) {
    if (!(e instanceof Error)) {
      next(e);
    } else if (e.message === "Values are missing") {
      res.json({ error: "parameters missing" });
    } else {
      res.json({ error: "malformatted parameters" });
    }
  }
});

app.listen(3003, () => {
  console.log("Server is running on http://localhost:3003");
});
