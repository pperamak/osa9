import { NonSensitiveDiaryEntry } from "../types";

interface ContentProps{
  entries: NonSensitiveDiaryEntry[]
}
const Entries = ({ entries }: ContentProps) =>{

  return (
    <div>
      <h3>Diary entries</h3>
      <ul>
        {entries.map(entry =>
          <li key={entry.id}>
            <h4>{entry.date}</h4>
            <div>visibility: {entry.visibility}</div>
            <div>weather: {entry.weather}</div>
          </li>
        )}
      </ul>

    </div>
  );
};

export default Entries;