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

    const currDate = new Date()

    return (
        <div className="sm:w-[90%] sm:m-auto text-center  ">
            <div className="my-6  sm:flex sm:justify-around text-details">
                <div className="text-xl font-bold sm:min-w-[150px]">
                    <p>{tourItem.town},</p>
                    <p>{tourItem.country}</p>
                </div>
                <div className="sm:w-[40%]">
                    <p>{tourItem.date.toLocaleDateString('en-EN', format)}</p>
                    <p>{tourItem.place}</p>
                </div>

                {tourItem.tickets && tourItem.date > currDate ? (
                    <button
                        onClick={() => gotoTickets(tourItem.tickets)}
                        className="uppercase tracking-widest
                         border-solid border border-details
                         hover:bg-details hover:text-main
                         rounded-full
                         mt-2 p-1 m-1 
                         w-[150px] sm:w-[30%] sm:min-w-[200px] sm:max-w-[250px]"
                    >
                        tickets
                    </button>
                ) : (
                    <div className="flex flex-col justify-center space-x-2 sm:w-[30%]  sm:max-w-[250px] items-center">
                        <button
                            disabled
                            className="uppercase tracking-widest
                            border-solid border border-details
                            rounded-full
                            mt-2 p-1 m-1 
                            w-[150px] sm:w-[30%] sm:min-w-[200px] sm:max-w-[250px]"
                        >
                            tickets
                        </button>

                        <p className="italic text-sm">
                            <TbTicketOff size={20} className=" inline" /> no
                            tickets available
                        </p>
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
