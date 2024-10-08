import express from "express";
import { calculateBmi, parseValues } from "./bmiCalculator";

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
  } catch (error) {
    res.json({ error: "malformatted parameters" });
  }
});

app.listen(3003, () => {
  console.log("Server is running on http://localhost:3003");
});
