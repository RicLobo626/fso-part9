import { SyntheticEvent } from "react";

type Props = {
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  error: string | null;
};

export const DiaryEntryForm = ({ onSubmit, error }: Props) => {
  return (
    <section>
      <h2>Add new entry</h2>

      <form onSubmit={onSubmit}>
        <div style={{ color: "red", marginBottom: "1em" }}>{error}</div>

        <div>
          <label htmlFor="date">Date</label>
          <input type="text" id="date" name="date" />
        </div>
        <div>
          <label htmlFor="visibility">Visibility </label>
          <select name="visibility" id="visibility">
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <select name="weather" id="weather">
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="stormy">Stormy</option>
            <option value="windy">Windy</option>
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" name="comment" />
        </div>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
