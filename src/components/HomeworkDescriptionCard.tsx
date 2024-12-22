import { HomeworkType } from '../services/HomewrokType'

type HomeworkDescriptionCard = {
    homework: HomeworkType;
}

export default function HomeworkDescriptionCard({ homework }: HomeworkDescriptionCard) {
    return (
        <div className='rounded-[1rem] overflow-hidden border-black border-solid border-[1.5px]'>
            <div className='py-[.5rem] px-[1rem] font-ptsans font-bold cursor-pointer hover:text-blue-600 transition-colors bg-sunglow'>
                {homework.short_description}
            </div>
            <div className='py-[.5rem] px-[1rem] font-nunito text-sm'>
                {homework.content}
            </div>
        </div>
    )
}