import Card from "./Card"

type CardType = {
    imageURL: string,
    imageAlternativeDescription?: string,
    textTitle: string,
    descriptionText: string
}

type CardContainerType = {
    cardsData: CardType[]
}

export default function CardContainer({ cardsData }: CardContainerType) {
    return (
        <div className='grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-6 p-10 justify-items-center'>
            {cardsData.map((cardData) => {
                return (
                    <Card
                        key={cardData.textTitle + cardData.imageURL}
                        imageURL={cardData.imageURL}
                        textTitle={cardData.textTitle}
                        descriptionText={cardData.descriptionText}
                    />
                )
            })}
        </div>
    )
}