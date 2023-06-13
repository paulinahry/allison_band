import React from 'react'
import { TbTicketOff } from 'react-icons/tb'

function CardTour({ item: tourItem }) {
    const format = {
        month: 'short',
        weekday: 'long',
        year: 'numeric',
        day: 'numeric',
    }

    function gotoTickets(url) {
        window.open(url, '_blank')
    }

    return (
        <div className="sm:w-[90%] sm:m-auto">
            <div className="my-6  sm:flex sm:justify-around ">
                <div className="text-xl font-bold sm:min-w-[150px]">
                    <p>{tourItem.town},</p>
                    <p>{tourItem.country}</p>
                </div>
                <div className="sm:w-[40%]">
                    <p>{tourItem.date.toLocaleDateString('en-EN', format)}</p>
                    <p>{tourItem.place}</p>
                </div>

                {tourItem.tickets ? (
                    <button
                        onClick={() => gotoTickets(tourItem.tickets)}
                        className="uppercase tracking-widest
                         border-solid border-2 border-details
                         hover:bg-details hover:text-black 
                         rounded 
                         mt-2 p-1 m-1 
                         w-[150px] sm:w-[30%] sm:min-w-[200px] sm:max-w-[250px]"
                    >
                        {'tickets'}
                    </button>
                ) : (
                    <div className="flex justify-center space-x-2 sm:w-[30%]  sm:max-w-[250px] items-center">
                        <TbTicketOff size={20} />
                        <p className="italic text-sm">no tickets available</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center bg-details ">
                <hr />
            </div>
        </div>
    )
}

export default CardTour
