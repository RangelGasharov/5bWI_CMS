import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SubjectType } from '../services/SubjectType';
import { HomeworkType } from '../services/HomeworkType';
import HomeworkDescriptionCard from '../components/HomeworkDescriptionCard';
import { Button } from '@mui/material';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function HomeworkOverviewPage() {
    const [subjects, setSubjects]: any = useState([]);
    const [homeworks, setHomeworks]: any = useState([]);
    const [filteredHomeworks, setFilteredHomeworks]: any = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getSubjects();
        getHomeworks();
    }, []);

    async function getSubjects() {
        const subjects: any = await supabase.from("subject").select();
        setSubjects(subjects);
    }

    async function getHomeworks() {
        const homeworks: any = await supabase.from("homework").select();
        setHomeworks(homeworks);
        setFilteredHomeworks(homeworks);
        setFilteredHomeworks(homeworks);
        setFilteredHomeworks(homeworks);
    }

    const applyFilters = (newParams: URLSearchParams) => {
        const subjectId = newParams.get('subjectId');
        const startDate = newParams.get('startDate');
        const endDate = newParams.get('endDate');
        let filtered = [...homeworks.data];

        if (subjectId) {
            filtered = filtered.filter((homework: HomeworkType) => homework.subject_fk === parseInt(subjectId));
        }

        if (startDate && endDate) {
            filtered = filtered.filter((homework: HomeworkType) => homework.due_date >= startDate && homework.due_date <= endDate);
        }

        setFilteredHomeworks({ ...homeworks, data: filtered });
    };

    const handleSubjectClick = (subjectId?: number) => {
        const newParams = new URLSearchParams(searchParams);

        if (subjectId) {
            newParams.set('subjectId', subjectId.toString());
            setSelectedSubject(subjects.data.find((subject: SubjectType) => subject.id === subjectId));
        } else {
            newParams.delete('subjectId');
            setSelectedSubject(null);
        }

        setSearchParams(newParams);
        applyFilters(newParams);
        setIsOpen(false);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newParams = new URLSearchParams(searchParams);

        if (value) {
            newParams.set(name, value);
        } else {
            newParams.delete(name);
        }

        setSearchParams(newParams);
        applyFilters(newParams);
    };

    return (
        <div>
            <div className='p-4 flex flex-wrap gap-4 items-center'>
                <div className='relative' ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='w-48 px-4 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between items-center'
                    >
                        <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
                            {selectedSubject ? selectedSubject.name : 'Alle Fächer'}
                        </span>
                        <span>▼</span>
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

                <div className='flex gap-2 flex-col md:flex-row'>
                    <div className='flex gap-2 items-center'>
                        <label className='text-sm text-gray-600'>Von</label>
                        <input
                            type="date"
                            name="startDate"
                            value={searchParams.get('startDate') || ''}
                            onChange={handleDateChange}
                            className='px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label className='text-sm text-gray-600'>Bis</label>
                        <input
                            type="date"
                            name="endDate"
                            value={searchParams.get('endDate') || ''}
                            onChange={handleDateChange}
                            className='px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                    </div>
                </div>
                <Link to="/add-homework" className="text-blue-500">
                    <Button>Hausübung hinzufügen</Button>
                </Link>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4'>
                {filteredHomeworks?.data?.map((homework: HomeworkType) => (
                    <HomeworkDescriptionCard key={homework.id} homework={homework} />
                ))}
            </div>
        </div>
    )
}

export default HomeworkOverviewPage