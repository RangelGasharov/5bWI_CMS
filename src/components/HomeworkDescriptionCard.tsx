import { Link } from 'react-router-dom';
import { HomeworkType } from '../services/HomeworkType';
import EditIcon from '@mui/icons-material/Edit';

type HomeworkDescriptionCard = {
    homework: HomeworkType;
}

export default function HomeworkDescriptionCard({ homework }: HomeworkDescriptionCard) {
    return (
        <div className='rounded-[.5rem] overflow-hidden shadow-sm shadow-black'>

            <div className='py-[.5rem] px-[1rem] font-ptsans font-bold  transition-colors bg-sunglow flex justify-between'>
                <div className=''>
                    {homework.short_description}
                </div>
                <Link className='cursor-pointer hover:text-blue-600' to={`/edit-homework/${homework.id}`}>
                    <EditIcon />
                </Link>
            </div>

            <div className='py-[.5rem] px-[1rem] font-nunito text-sm'>
                {homework.content}
            </div>
        </div>
    )
}