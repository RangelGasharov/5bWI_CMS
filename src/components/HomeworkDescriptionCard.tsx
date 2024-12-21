import { HomeworkType } from '../services/HomewrokType'

type HomeworkDescriptionCard = {
    homework: HomeworkType;
}

export default function HomeworkDescriptionCard({ homework }: HomeworkDescriptionCard) {
    return (
        <div>
            <div className='font-bold cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap'>
                {homework.short_description}
            </div>
            <div className='text-sm border-separate border-black border-x-4'>
                {homework.content}
            </div>
        </div>
    )
}