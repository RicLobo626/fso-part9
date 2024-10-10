import { CoursePart, CoursePartBackground, CoursePartBasic, CoursePartSpecial } from "../../types";

type BaseInfoProps = {
  part: CoursePart;
};

const BaseInfo = ({ part }: BaseInfoProps) => {
  return (
    <p>
      <strong>{part.name}</strong> - {part.exerciseCount} exercises
    </p>
  );
};

type BaseInfoWithDescriptionProps = {
  part: CoursePartBasic | CoursePartBackground | CoursePartSpecial;
};

const BaseInfoWithDescription = ({ part }: BaseInfoWithDescriptionProps) => {
  return (
    <>
      <BaseInfo part={part} />
      <em>{part.description}</em>
    </>
  );
};

type Props = {
  part: CoursePart;
};

export const Part = ({ part }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch (part.kind) {
    case "basic":
      return <BaseInfoWithDescription part={part} />;
    case "group":
      return (
        <>
          <BaseInfo part={part} />
          <p>Project exercises: {part.groupProjectCount}</p>
        </>
      );

    case "background":
      return (
        <>
          <BaseInfoWithDescription part={part} />
          <p>
            Submit to <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </>
      );
    case "special":
      return (
        <>
          <BaseInfoWithDescription part={part} />
          <p>Required skills: {part.requirements.join(", ")}</p>
        </>
      );

    default:
      return assertNever(part);
  }
};
