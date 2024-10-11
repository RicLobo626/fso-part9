import { Typography } from "@mui/material";
import { HealthCheckEntry as THealthCheckEntry } from "../../types";
import { Favorite } from "@mui/icons-material";

type Props = {
  entry: THealthCheckEntry;
};

export const HealthCheckEntry = ({ entry }: Props) => {
  let ratingColor;

  switch (entry.healthCheckRating) {
    case 1:
      ratingColor = "yellow";
      break;
    case 2:
      ratingColor = "orange";
      break;
    case 3:
      ratingColor = "red";
      break;
    default:
      ratingColor = "green";
  }

  return (
    <Typography>
      <Favorite sx={{ color: ratingColor }} />
    </Typography>
  );
};
