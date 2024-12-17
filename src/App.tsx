import { createClient } from '@supabase/supabase-js';
import './App.css'
import { useEffect, useState } from 'react';

type SubjectType = {
  id: number,
  name: string
}

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects();
  }, []);

  async function getSubjects() {
    const subjects: any = await supabase.from("subject").select();
    setSubjects(subjects);
  }

  return (
    <ul>
      {subjects?.map((subject: SubjectType) => (
        <div key={subject.id}>{subject.name}</div>
      ))}
    </ul>
  )
}

export default App