import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { HomeworkType } from '../services/HomeworkType';
import HomeworkDescriptionCard from '../components/HomeworkDescriptionCard';
import { Button, DialogTitle } from '@mui/material';
import 'dayjs/locale/de';
import PopUpFilter from './PopUpFilter';
import AddIcon from '@mui/icons-material/Add';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function HomeworkOverviewPage() {
    const [subjects, setSubjects]: any = useState([]);
    const [homeworks, setHomeworks]: any = useState([]);
    const [filteredHomeworks, setFilteredHomeworks]: any = useState([]);
    const [searchParams]: any = useSearchParams();

    async function getSubjects() {
        try {
            const { data: subjects, error } = await supabase.from("subject").select();
            if (error) { console.error("An error has occured while trying to fetch the subjects:", error); }
            setSubjects(subjects);
        } catch (error) {
            console.error("An error has occured while trying to fetch the subjects:", error);
        }
    }

    async function getHomeworks() {
        try {
            const { data: homeworks, error } = await supabase.from("homework").select();
            if (error) { console.error("An error has occured while trying to fetch the homeworks: ", error); }
            setHomeworks(homeworks);
            setFilteredHomeworks(homeworks);
        } catch (error) {
            console.error("An error has occured while trying to fetch the homeworks: ", error);
        }
    }

    useEffect(() => {
        getSubjects();
        getHomeworks();
    }, []);

    useEffect(() => {
        filterHomeworks();
    }, [searchParams, homeworks]);

    const filterHomeworks = () => {
        const subjectId = searchParams.get('subjectId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let filtered = [...homeworks];

        if (subjectId) {
            const parsedSubjectId = parseInt(subjectId, 10);
            if (!isNaN(parsedSubjectId)) {
                filtered = filtered.filter(
                    (homework: HomeworkType) => homework.subject_fk === parsedSubjectId
                );
            }
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                filtered = filtered.filter(
                    (homework: HomeworkType) => {
                        const dueDate = new Date(homework.due_date);
                        return dueDate >= start && dueDate <= end;
                    }
                );
            }
        }
        setFilteredHomeworks(filtered);
    };

    return (
        <div>
            <div className='p-4 flex flex-wrap gap-4 items-center'>
                <DialogTitle>Übersicht Hausübungen</DialogTitle>
                <PopUpFilter subjects={subjects} />
                <Link to="/add-homework" className="text-blue-500">
                    <Button variant="outlined" sx={{ display: "flex", gap: ".5rem" }}><AddIcon /> Hausübung hinzufügen</Button>
                </Link>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4'>
                {filteredHomeworks?.map((homework: HomeworkType) => (
                    <HomeworkDescriptionCard key={homework.id} homework={homework} />
                ))}
            </div>
        </div>
    )
}

export default HomeworkOverviewPage