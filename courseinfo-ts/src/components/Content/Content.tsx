import { CoursePart } from "../../types";
import { Part } from "./Part";

type Props = {
  courseParts: CoursePart[];
};

export const Content = ({ courseParts }: Props) => {
  return (
    <main>
      <ol>
        {courseParts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </ol>
    </main>
  );
};
