import { Button, Dialog, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { SubjectType } from '../services/SubjectType'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import TuneIcon from '@mui/icons-material/Tune';

type PopUpFilterType = {
    subjects: any
}

export default function PopUpFilter({ subjects }: PopUpFilterType) {
    const [searchParams, setSearchParams]: any = useSearchParams();
    const [selectedSubjectId, setSelectedSubjectId] = useState(searchParams.get("subjectId") ?? "");
    const [startDate, setStartDate] = useState(searchParams.get("startDate") ? dayjs(searchParams.get("startDate")) : null);
    const [endDate, setEndDate] = useState(searchParams.get("endDate") ? dayjs(searchParams.get("endDate")) : null);
    const [open, setOpen] = useState(false);

    const handleSubjectChange = (subjectId?: number) => {
        const newParams = new URLSearchParams(searchParams);

        if (subjectId) {
            newParams.set('subjectId', subjectId.toString());
            setSelectedSubjectId(subjectId);
        } else {
            newParams.delete('subjectId');
            setSelectedSubjectId("");
        }

        setSearchParams(newParams);
    };

    const handleStartDateChange = (newDate: any) => {
        if (newDate === null || !dayjs(newDate).isValid()) {
            setStartDate(null);
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("startDate");
            setSearchParams(newParams);
        } else {
            const formattedDate: any = dayjs(newDate).format("YYYY-MM-DD");
            setStartDate(formattedDate);
            const newParams = new URLSearchParams(searchParams);
            newParams.set("startDate", formattedDate);
            setSearchParams(newParams);
        }
    };

    const handleEndDateChange = (newDate: any) => {
        if (newDate === null || !dayjs(newDate).isValid()) {
            setEndDate(null);
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("endDate");
            setSearchParams(newParams);
        } else {
            const formattedDate: any = dayjs(newDate).format("YYYY-MM-DD");
            setEndDate(formattedDate);
            const newParams = new URLSearchParams(searchParams);
            newParams.set("endDate", formattedDate);
            setSearchParams(newParams);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilterReset = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchParams("");
        window.location.reload();
        handleClose();
    }

    return (
        <div>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{ display: "flex", gap: ".5rem" }}
            >
                <TuneIcon />
                Filter öffnen
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <div className='grid gap-4 items-center'>
                        <FormControl fullWidth>
                            <InputLabel>Fach</InputLabel>
                            <Select
                                label="Fach"
                                value={selectedSubjectId}
                                onChange={(e: any) => handleSubjectChange(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Alle</em>
                                </MenuItem>
                                {subjects?.sort((a: SubjectType, b: SubjectType) => a.name.localeCompare(b.name))
                                    .map((subject: SubjectType) => (
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
                                    value={startDate ? dayjs(startDate) : null}
                                    onChange={(newValue: any) => handleStartDateChange(newValue)}
                                />
                                <DatePicker
                                    label="Enddatum"
                                    value={endDate ? dayjs(endDate) : null}
                                    onChange={(newValue: any) => handleEndDateChange(newValue)}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Schließen</Button>
                    <Button onClick={handleFilterReset} variant="contained" sx={{ backgroundColor: "red", ":hover": { bgcolor: "red", filter: "brightness(1.1)" } }}>zurücksetzen</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}