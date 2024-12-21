import { createClient } from '@supabase/supabase-js';
import './App.css'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SubjectType } from './services/SubjectType';
import { HomeworkType } from './services/HomewrokType';
import HomeworkDescriptionCard from './components/HomeworkDescriptionCard';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {

  const [subjects, setSubjects]: any = useState([]);
  const [homeworks, setHomeworks]: any = useState([]);
  const [filteredHomeworks, setFilteredHomeworks]: any = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getSubjects();
    getHomeworks();
  }, []);

  useEffect(() => {
    const selectedSubjectId = searchParams.get('subjectId');
    if (selectedSubjectId) {
      const filteredBySubject = homeworks.data?.filter(
        (homework: any) => homework.subject_fk === parseInt(selectedSubjectId)
      );
      setFilteredHomeworks({ ...homeworks, data: filteredBySubject });
    } else {
      getHomeworks();
    }
  }, [searchParams]);

  async function getSubjects() {
    const subjects: any = await supabase.from("subject").select();
    setSubjects(subjects);
  }

  async function getHomeworks() {
    const homeworks: any = await supabase.from("homework").select();
    setHomeworks(homeworks);
    const selectedSubjectId = searchParams.get('subjectId');
    if (selectedSubjectId) {
      const filteredBySubject = homeworks.data?.filter(
        (homework: any) => homework.subject_fk === parseInt(selectedSubjectId)
      );
      setFilteredHomeworks({ ...homeworks, data: filteredBySubject });
    } else {
      setFilteredHomeworks(homeworks);
    }
  }

  const handleSubjectClick = (subjectId?: number) => {
    if (subjectId) {
      setSearchParams({ subjectId: subjectId.toString() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center p-6 bg-sunglow'>
        <div className='text-3xl font-oswald'>HTL Dornbirn</div>
      </div>
      <div className='flex gap-6 p-4 overflow-x-auto 
        [scrollbar-width:thin] 
        [scrollbar-color:rgba(0,0,0,0.1)_transparent]
        [&::-webkit-scrollbar]:h-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-black/20
        [&::-webkit-scrollbar-thumb]:rounded-full'>
        <button
          onClick={() => handleSubjectClick()}
          className='shrink-0 cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap'
        >
          Alle Fächer
        </button>
        {subjects?.data?.map((subject: SubjectType) => (
          <button
            onClick={() => handleSubjectClick(subject.id)}
            className='shrink-0 cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap'
            key={subject.id}
          >
            {subject.name}
          </button>
        ))}
      </div>
      <div className='flex flex-col gap-4 p-4'>
        {filteredHomeworks?.data?.map((homework: HomeworkType) => (
          <HomeworkDescriptionCard key={homework.id} homework={homework} />
        ))}
      </div>
    </div>
  )
}

export default App