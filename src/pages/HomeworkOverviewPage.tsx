import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SubjectType } from '../services/SubjectType';
import { HomeworkType } from '../services/HomeworkType';
import HomeworkDescriptionCard from '../components/HomeworkDescriptionCard';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function HomeworkOverviewPage() {
    const [subjects, setSubjects]: any = useState([]);
    const [homeworks, setHomeworks]: any = useState([]);
    const [filteredHomeworks, setFilteredHomeworks]: any = useState([]);
    const [searchParams, setSearchParams]: any = useSearchParams();
    const [selectedSubject, setSelectedSubject] = useState<any>("");
    const [startDate, setStartDate] = useState(searchParams.get("startDate") ? dayjs(searchParams.get("startDate")) : null);
    const [endDate, setEndDate] = useState(searchParams.get("endtDate") ? dayjs(searchParams.get("endDate")) : null);

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

    const handleSubjectChange = (event: any) => {
        setSelectedSubject(event.target.value);
        handleSubjectClick(event.target.value);
    };

    const handleSubjectClick = (subjectId?: number) => {
        const newParams = new URLSearchParams(searchParams);

        if (subjectId) {
            newParams.set('subjectId', subjectId.toString());
        } else {
            newParams.delete('subjectId');
        }

        setSearchParams(newParams);
        applyFilters(newParams);
    };

    const handleStartDateChange = (newDate: any) => {
        const formattedDate: any = dayjs(newDate).format("YYYY-MM-DD")
        setStartDate(formattedDate);
        const newParams = new URLSearchParams(searchParams);
        formattedDate ? newParams.set("startDate", formattedDate) : newParams.delete("startDate");
        setSearchParams(newParams);
        applyFilters(newParams);
    };

    const handleEndDateChange = (newDate: any) => {
        const formattedDate: any = dayjs(newDate).format("YYYY-MM-DD")
        setEndDate(formattedDate);
        const newParams = new URLSearchParams(searchParams);
        formattedDate ? newParams.set("endDate", formattedDate) : newParams.delete("endDate");
        setSearchParams(newParams);
        applyFilters(newParams);
    };

    return (
        <div>
            <div className='p-4 flex flex-wrap gap-4 items-center'>
                <FormControl fullWidth>
                    <InputLabel>Fach</InputLabel>
                    <Select
                        value={selectedSubject}
                        label="Fach"
                        onChange={handleSubjectChange}
                    >
                        <MenuItem value="">
                            <em>Alle</em>
                        </MenuItem>
                        {subjects?.data?.map((subject: SubjectType) => (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className='flex gap-2 flex-col md:flex-row'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                        <DatePicker
                            label="Startdatum"
                            defaultValue={startDate}
                            onChange={(newValue: any) => handleStartDateChange(newValue)}
                        />
                        <DatePicker
                            label="EndDatum"
                            defaultValue={endDate}
                            onChange={(newValue: any) => handleEndDateChange(newValue)}
                        />
                    </LocalizationProvider>
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