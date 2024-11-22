import { useState, useEffect } from 'react';
import { getAllEntries } from './services/diaryService';
import { NonSensitiveDiaryEntry } from './types';
import Entries from './components/Entries';
import EntryForm from './components/NewEntry';

const App = () => {
  
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data =>{
      setEntries(data);
    });
  }, []);

  return (
    <div>
      <EntryForm setEntries={setEntries} />
      <Entries entries={entries} /> 
    </div>
  );
};

export default App;
