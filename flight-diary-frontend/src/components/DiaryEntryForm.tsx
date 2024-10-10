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
          <input type="date" id="date" name="date" />
        </div>

        <fieldset>
          <legend>Select visibility</legend>

          <input type="radio" id="great" name="visibility" value="great" />
          <label htmlFor="great">Great</label>

          <input type="radio" id="good" name="visibility" value="good" />
          <label htmlFor="good">Good</label>

          <input type="radio" id="ok" name="visibility" value="ok" />
          <label htmlFor="ok">Ok</label>

          <input type="radio" id="poor" name="visibility" value="poor" />
          <label htmlFor="poor">Poor </label>
        </fieldset>

        <fieldset>
          <legend>Select weather</legend>

          <input type="radio" id="sunny" name="weather" value="sunny" />
          <label htmlFor="sunny">Sunny</label>

          <input type="radio" id="rainy" name="weather" value="rainy" />
          <label htmlFor="rainy">Rainy</label>

          <input type="radio" id="cloudy" name="weather" value="cloudy" />
          <label htmlFor="cloudy">Cloudy</label>

          <input type="radio" id="stormy" name="weather" value="stormy" />
          <label htmlFor="stormy">Stormy</label>

          <input type="radio" id="windy" name="weather" value="windy" />
          <label htmlFor="windy">Windy</label>
        </fieldset>

        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" name="comment" />
        </div>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
