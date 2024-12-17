import { createClient } from '@supabase/supabase-js';
import './App.css'
import { useEffect, useState } from 'react';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects();
  }, []);

  async function getSubjects() {
    const { data } = await supabase.from("subject").select();
    setSubjects(data);
  }

  return (
    <ul>
      {subjects?.map((subject) => (
        <div key={subject.id}>{subject.name}</div>
      ))}
    </ul>
  )
}

export default App