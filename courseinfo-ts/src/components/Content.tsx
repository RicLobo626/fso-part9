import { CoursePart } from "../types";

type Props = {
  courseParts: CoursePart[];
};

export const Content = ({ courseParts }: Props) => {
  return (
    <main>
      <ol>
        {courseParts.map((part) => (
          <li key={part.name}>
            {part.name} - {part.exerciseCount}
          </li>
        ))}
      </ol>
    </main>
  );
};
