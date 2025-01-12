import { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SubjectType } from '../services/SubjectType';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const HomeworkAddPage = () => {
    const [dueDate, setDueDate] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [content, setContent] = useState("");
    const [subjects, setSubjects] = useState<any>();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<SubjectType>();
    const dropdownRef = useRef<HTMLDivElement>(null);

    async function getSubjects() {
        const subjects = await supabase.from("subject").select();
        setSubjects(subjects);
    }

    async function postHomework() {
        const homeworkData = {
            due_date: dueDate,
            short_description: shortDescription,
            subject_fk: selectedSubject?.id,
            content: content
        }

        const { data, error } = await supabase.from("homework").upsert([homeworkData]);

        if (error) {
            console.error('Error posting data:', error);
            return;
        }

        console.log('Data posted successfully:', data);
    }

    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <div className='p-4'>
            <div className='p-4 flex flex-col gap-4 rounded-[1rem] overflow-hidden border-black border-solid border-[1.5px]'>
                <div>
                    <div>Fach</div>
                    <div ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='w-48 px-4 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between items-center'
                        >
                            <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
                                {selectedSubject ? selectedSubject.name : ""}
                            </span>
                            <span>▼</span>
                        </button>

                        {isOpen && (
                            <div className='mt-1 w-48 bg-white border rounded-md shadow-lg z-10'>
                                {subjects?.data?.map((subject: SubjectType) => (
                                    <button
                                        key={subject.id}
                                        value={subject.id}
                                        onClick={() => {
                                            setSelectedSubject(subject);
                                            setIsOpen(!isOpen);
                                        }}
                                        className='w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis'
                                    >
                                        {subject.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div>Abgabedatum</div>
                    <div>
                        <input type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(e) => { setDueDate(e.target.value) }} />
                    </div>
                </div>
                <div>
                    <div>Kurzbeschreibung</div>
                    <div>
                        <input type="text" id="shortDescription" name="shortDescription" value={shortDescription} onChange={(e) => { setShortDescription(e.target.value) }} />
                    </div>
                </div>
                <div>
                    <div>Inhalt</div>
                    <div>
                        <textarea id="content" name="content" rows={4} cols={50} value={content} onChange={(e) => { setContent(e.target.value) }}></textarea>
                    </div>
                </div>
                <div>
                    <button onClick={postHomework}>Speichen</button>
                </div>
            </div>
        </div>
    );
};

export default HomeworkAddPage; 