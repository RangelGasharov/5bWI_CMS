import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { SubjectType } from '../services/SubjectType'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

type PopUpFilterType = {
    subjects: any
}

export default function PopUpFilter({ subjects }: PopUpFilterType) {
    const [searchParams, setSearchParams]: any = useSearchParams();
    const [selectedSubjectId, setSelectedSubjectId] = useState(searchParams.get("subjectId") ?? "");
    const [startDate, setStartDate] = useState(searchParams.get("startDate") ? dayjs(searchParams.get("startDate")) : null);
    const [endDate, setEndDate] = useState(searchParams.get("endDate") ? dayjs(searchParams.get("endDate")) : null);

    const handleSubjectChange = (subjectId?: number) => {
        const newParams = new URLSearchParams(searchParams);

        if (subjectId) {
            newParams.set('subjectId', subjectId.toString());
        } else {
            newParams.delete('subjectId');
        }

        setSearchParams(newParams);
    };

    const handleStartDateChange = (newDate: any) => {
        const formattedDate: any = dayjs(newDate).format("YYYY-MM-DD")
        setStartDate(formattedDate);
        const newParams = new URLSearchParams(searchParams);
        formattedDate ? newParams.set("startDate", formattedDate) : newParams.delete("startDate");
        setSearchParams(newParams);
    };

    const handleEndDateChange = (newDate: any) => {
        const formattedDate: any = dayjs(newDate).format("YYYY-MM-DD")
        setEndDate(formattedDate);
        const newParams = new URLSearchParams(searchParams);
        formattedDate ? newParams.set("endDate", formattedDate) : newParams.delete("endDate");
        setSearchParams(newParams);
    };

    return (
        <div>
            <div className='flex flex-wrap gap-4 items-center'>
                <FormControl fullWidth>
                    <InputLabel>Fach</InputLabel>
                    <Select
                        label="Fach"
                        defaultValue={selectedSubjectId}
                        onChange={(e: any) => handleSubjectChange(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Alle</em>
                        </MenuItem>
                        {subjects?.map((subject: SubjectType) => (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className='flex gap-2'>
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
            </div>
        </div>
    )
}
