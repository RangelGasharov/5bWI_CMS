type CardType = {
    imageURL: string,
    imageAlternativeDescription?: string,
    textTitle: string,
    descriptionText: string
}

export default function Card({ imageURL, imageAlternativeDescription = "image", textTitle, descriptionText }: CardType) {
    return (
        <div className="bg-slate-200 rounded-2xl overflow-hidden max-w-64">
            <div>
                <img className="object-scale-down overflow-hidden" src={imageURL} alt={imageAlternativeDescription} />
            </div>
            <div className="p-6 text-xs">
                <div className="font-bold">{textTitle}</div>
                <div>{descriptionText}</div>
            </div>
        </div>
    )
}