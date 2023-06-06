import React from 'react'

function DataTour() {
    const tour = [
        {
            id: 1,
            town: 'Paris',
            country: 'France',
            date: new Date(2023, 6, 20),
            place: 'Summer Paradise Club',
            tickets: 'https://www.eventbrite.com/',
        },
        {
            id: 2,
            town: 'Marseille',
            country: 'France',
            date: new Date(2023, 6, 21),
            place: 'rester',
            tickets: 'https://www.eventbrite.com/',
        },
        {
            id: 3,
            town: 'Lyon',
            country: 'France',
            date: new Date(2023, 6, 24),
            place: 'Non Club',
            tickets: 'https://www.eventbrite.com/',
        },
        {
            id: 4,
            town: 'Toulouse',
            country: 'France',
            date: new Date(2023, 6, 26),
            place: 'Oui',
            tickets: 'https://www.eventbrite.com/',
        },
        {
            id: 5,
            town: 'Nice',
            country: 'France',
            date: new Date(2023, 6, 27),
            place: 'Garçon',
        },
        {
            id: 6,
            town: 'Nantes',
            country: 'France',
            date: new Date(2023, 6, 28),
            place: 'Au revoir',
            tickets: 'https://www.eventbrite.com/',
        },
        {
            id: 7,
            town: 'Montpellier',
            country: 'France',
            date: new Date(2023, 6, 29),
            place: 'Bonheur',
            tickets: 'https://www.eventbrite.com/',
        },
        {
            id: 8,
            town: 'Bordeaux',
            country: 'France',
            date: new Date(2023, 6, 30),
            place: 'Sourire',
            tickets: 'https://www.eventbrite.com/',
        },
        {
            id: 9,
            town: 'Lille',
            country: 'France',
            date: new Date(2023, 7, 1),
            place: 'Amour',
        },
    ]

    const format = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }

    return (
        <div className=" p-10 flex flex-col justify-center text-center text-detailsRed ">
            {tour.map((item) => (
                <div key={item.id}>
                    <div className="m-6">
                        <h3 className="text-xl font-bold">
                            {item.town}, {item.country}
                        </h3>
                        <p>{item.date.toLocaleDateString('en-EN', format)}</p>
                        <p>{item.place}</p>

                        {item.tickets ? (
                            <button
                                className="uppercase  tracking-widest
                        border-solid border-2 border-detailsRed hover:bg-detailsRed hover:text-white rounded
                        p-1 w-[150px]"
                            >
                                {'tickets'}
                            </button>
                        ) : null}
                    </div>
                    <div className=" inline-flex items-center justify-center bg-gray-500 border-1 w-[80%] ">
                        <hr />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DataTour
