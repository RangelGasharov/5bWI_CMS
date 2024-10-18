import Card from "./Card"

type CardType = {
    imageURL: string,
    imageAlternativeDescription?: string,
    textTitle: string,
    descriptionText: string
}

type CardContainerType = {
    cardData: CardType[]
}

export default function CardContainer({ cardData }: CardContainerType) {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-2, lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-6 p-10 justify-items-center'>
            {cardData.map((data) => {
                return (
                    <Card
                        key={data.textTitle + data.imageURL}
                        imageURL={data.imageURL}
                        textTitle={data.textTitle}
                        descriptionText={data.descriptionText}
                    />
                )
            })}
        </div>
    )
}