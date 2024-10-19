type CardType = {
    imageURL: string,
    imageAlternativeDescription?: string,
    textTitle: string,
    descriptionText: string
}

export default function Card({ imageURL, imageAlternativeDescription = "image", textTitle, descriptionText }: CardType) {
    return (
        <div className="bg-slate-200 rounded-xl overflow-hidden">
            <div>
                <img className="object-cover overflow-hidden w-[100%] h-48" src={imageURL} alt={imageAlternativeDescription} />
            </div>
            <div className="p-6 text-xs grid gap-y-5">
                <div className="font-bold">{textTitle}</div>
                <div>{descriptionText}</div>
            </div>
        </div>
    )
}