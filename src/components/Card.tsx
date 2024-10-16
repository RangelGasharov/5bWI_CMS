type CardType = {
    imageURL: string,
    imageAlternativeDescription?: string,
    textTitle: string,
    descriptionText: string
}

export default function Card({ imageURL, imageAlternativeDescription = "image", textTitle, descriptionText }: CardType) {
    return (
        <div className="bg-slate-200 rounded-2xl overflow-hidden">
            <div className="size-64">
                <img src={imageURL} alt={imageAlternativeDescription} />
            </div>
            <div>
                <div>{textTitle}</div>
                <div>{descriptionText}</div>
            </div>
        </div>
    )
}