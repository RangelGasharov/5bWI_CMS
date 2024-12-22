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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject]: any = useState(null);

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
      setSelectedSubject(subjects.data.find((subject: SubjectType) => subject.id === subjectId));
    } else {
      setSearchParams({});
      setSelectedSubject(null);
    }
    setIsOpen(false);
  };

  return (
    <div>
      <div className='flex justify-between items-center p-6 bg-sunglow'>
        <div className='text-3xl font-oswald'>HTL Dornbirn</div>
      </div>
      <div className='relative p-4'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-48 px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 whitespace-nowrap overflow-hidden text-ellipsis relative'
        >
          {selectedSubject ? selectedSubject.name : 'Alle Fächer'}
          <span className='float-right absolute right-[.5rem]'>▼</span>
        </button>

        {isOpen && (
          <div className='absolute mt-1 w-48 bg-white border rounded-md shadow-lg z-10'>
            <button
              onClick={() => handleSubjectClick()}
              className='w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis'
            >
              Alle Fächer
            </button>
            {subjects?.data?.map((subject: SubjectType) => (
              <button
                key={subject.id}
                onClick={() => handleSubjectClick(subject.id)}
                className='w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis'
              >
                {subject.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4'>
        {filteredHomeworks?.data?.map((homework: HomeworkType) => (
          <HomeworkDescriptionCard key={homework.id} homework={homework} />
        ))}
      </div>
    </div>
  )
}

export default App