import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SubjectType } from '../services/SubjectType';
import { Button, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const HomeworkEditPage = () => {
    const [dueDate, setDueDate]: any = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [content, setContent] = useState("");
    const [subjects, setSubjects] = useState<any>();
    const [selectedSubjectId, setSelectedSubjectId]: any = useState<string | null>("");
    const [homework, setHomework]: any = useState();
    const params = useParams();
    const homeworkId = params.id;

    async function getHomework() {
        const { data } = await supabase.from("homework").select().eq("id", homeworkId);
        if (data && data.length > 0) {
            setHomework(data[0]);
        }
    }

    async function setIntialData(homework: any) {
        setDueDate(homework.due_date);
        setShortDescription(homework.short_description);
        setContent(homework.content);
        setSelectedSubjectId(homework.subject_fk);
    }

    async function getSubjects() {
        const subjects = await supabase.from("subject").select();
        setSubjects(subjects.data);
    }

    async function postHomework() {
        const homeworkData = {
            due_date: dueDate,
            short_description: shortDescription,
            subject_fk: selectedSubjectId,
            content: content
        }

        const { data, error } = await supabase.from("homework").update([homeworkData]).match({ id: homeworkId });

        if (error) {
            console.error('Error posting data:', error);
            return;
        }

        console.log('Data posted successfully:', data);
    }

    useEffect(() => {
        getHomework();
        getSubjects();

    }, []);

    useEffect(() => {
        if (homework) {
            setIntialData(homework);
        }
    }, [homework])

    return (
        <div className='p-4'>
            <Link to={"/"}>
                <Button>Zurück</Button>
            </Link>
            <DialogTitle>Hausübung bearbeiten</DialogTitle>
            <div className='p-4 flex flex-col gap-4 rounded-[1rem] overflow-hidden border-black border-solid border-[1.5px]'>
                <FormControl fullWidth>
                    <InputLabel>Fach</InputLabel>
                    <Select
                        label="Fach"
                        value={selectedSubjectId}
                        onChange={(e: any) => setSelectedSubjectId(e.target.value)}
                    >
                        {subjects?.map((subject: SubjectType) => (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                    <DatePicker
                        label="Abgabedatum"
                        value={dueDate ? dayjs(dueDate) : null}
                        onChange={(newValue: any) => setDueDate(dayjs(newValue).format("YYYY-MM-DD"))}
                    />
                </LocalizationProvider>
                <TextField label={"Kurzbeschreibung"} value={shortDescription} onChange={(e) => { setShortDescription(e.target.value) }}></TextField>
                <TextField multiline maxRows={10} placeholder='Inhalt' value={content} onChange={(e) => { setContent(e.target.value) }}></TextField>
                <Button variant='contained' onClick={postHomework}>Speichern</Button>
            </div>
        </div>
    );
};

export default HomeworkEditPage; 