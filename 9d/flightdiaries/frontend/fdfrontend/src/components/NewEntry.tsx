import { NonSensitiveDiaryEntry, Weather, Visibility } from "../types";
import { useState } from "react";
import { createEntry } from "../services/diaryService";
import axios from "axios";

interface EntryFormProps {
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const EntryForm = ({ setEntries }: EntryFormProps) =>{
  const [ date, setDate ] = useState('');
  const [ visibility, setVisibility ] = useState<Visibility>(Visibility.Great);
  const [ weather, setWeather ] = useState<Weather>(Weather.Sunny);
  const [ comment, SetComment ] = useState('');
  const [ errorMsg, setErrorMsg ] =useState('');

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
    const data = await createEntry({
      date,
      visibility,
      weather,
      comment
    });

    setEntries((prevEntries) => [...prevEntries, data]);

    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    SetComment('');
    }catch(error){
      if (axios.isAxiosError(error)){
        const message = error.response?.data || 'An error occurred. Please try again.';
      setErrorMsg(message);
      setTimeout(() => {
        setErrorMsg('');
      }, 5000); 
    } else{
      setErrorMsg('An unexpected error occurred.');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
    } 
    }
  };

  return (
    <div>
      <h3>Add new entry</h3>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={submit}>
        <div>
          date
          <input type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label>Visibility:</label>
          {Object.values(Visibility).map((visibilityOption) => (
            <label key={visibilityOption}>
              <input
                type="radio"
                name="visibility"
                value={visibilityOption}
                checked={visibility === visibilityOption}
                onChange={() => setVisibility(visibilityOption)}
              />
              {visibilityOption}
            </label>
          ))}
        </div>
        <div>
          <label>Weather:</label>
          {Object.values(Weather).map((weatherOption) => (
            <label key={weatherOption}>
              <input
                type="radio"
                name="weather"
                value={weatherOption}
                checked={weather === weatherOption}
                onChange={() => setWeather(weatherOption)}
              />
              {weatherOption}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => SetComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;