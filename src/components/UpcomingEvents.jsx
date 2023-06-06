import React from 'react'
import CardTour from './CardTour'
import tour from '../pages/dataTour'

function UpcomingEvents() {
    const currentDate = new Date()

    const upcomingEvents = tour
        .filter((item) => item.date >= currentDate)
        .slice(0, 3)

    return (
        <div className="flex justify-center align-center text-center">
            <div className="py-10 text-detailsRed md:w-[80%]">
                <h2 className="uppercase font-bold text-3xl">Upcoming Tours</h2>

                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((item) => (
                        <CardTour item={item} key={item.id} />
                    ))
                ) : (
                    <p className="italic text-sm">
                        No upcoming events at the moment.
                    </p>
                )}
            </div>
        </div>
    )
}

export default UpcomingEvents
