import { createClient } from '@supabase/supabase-js';
import './App.css'
import { useEffect, useState } from 'react';

type SubjectType = {
  id: number,
  created_at: Date,
  name: string,
  description: string
}

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {

  const [subjects, setSubjects]: any = useState([]);

  useEffect(() => {
    getSubjects();
  }, []);

  async function getSubjects() {
    const subjects: any = await supabase.from("subject").select();
    setSubjects(subjects);
  }

  return (
    <div>
      <div className='flex justify-around items-center py-6 bg-sunglow'>
        <div className='flex gap-10'>
          {subjects?.data?.map((subject: SubjectType) => (
            <div className='cursor-pointer' key={subject.id}>{subject.name}</div>
          ))}
        </div>
        <div className=' text-3xl font-oswald'>HTL Dornbirn</div>
      </div>
    </div>
  )
}

export default App