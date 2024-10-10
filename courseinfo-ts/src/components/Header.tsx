type Props = {
  courseName: string;
};

export const Header = ({ courseName }: Props) => {
  return (
    <header>
      <h1>{courseName}</h1>
    </header>
  );
};
