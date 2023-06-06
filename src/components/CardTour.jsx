import React from 'react'
import { TbTicketOff } from 'react-icons/tb'

function CardTour({ item: tourItem }) {
    const format = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }

    function gotoTickets(url) {
        window.open(url, '_blank')
    }

    return (
        <div>
            <div className="m-6">
                <h3 className="text-xl font-bold">
                    {tourItem.town}, {tourItem.country}
                </h3>
                <p>{tourItem.date.toLocaleDateString('en-EN', format)}</p>
                <p>{tourItem.place}</p>

                {tourItem.tickets ? (
                    <button
                        onClick={() => gotoTickets(tourItem.tickets)}
                        className="uppercase tracking-widest
                         border-solid border-2 border-detailsRed
                         hover:bg-detailsRed hover:text-black 
                         rounded 
                         mt-2 p-1 m-1 w-[150px]"
                    >
                        {'tickets'}
                    </button>
                ) : (
                    <div className="flex justify-center space-x-2">
                        <TbTicketOff size={20} />
                        <p className="italic text-sm">no tickets available</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center bg-gray-500 border-1 ">
                <hr />
            </div>
        </div>
    )
}

export default CardTour
