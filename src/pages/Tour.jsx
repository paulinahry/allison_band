import React from 'react'
import tour from 'pages/dataTour'
import CardTour from 'components/CardTour'
import { useEffect } from 'react'
import poster from '../assets/images/tour.jpg'
import concert from '../assets/images/concert.jpg'
import UpcomingEvents from '../components/UpcomingEvents'

function Tour() {
    return (
        <div
            className="  text-details bg-main
                    flex flex-col justify-center align-center text-center pb-5"
        >
            <div className="relative">
                <img src={concert} alt="concert" />
                <div
                    className="uppercase absolute top-0
                    w-full h-full
                 bg-main/40 pt-10 blur"
                >
                    <div>
                        <p
                            className="flex flex-col justify-center text-white mt-10
                         text-none sm:text-8xl
                        font-serif font-extrabold"
                        >
                            <span>Allison </span>
                            <span>Band</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* <div>
                <img
                    className="w-full h-full object-cover"
                    src={poster}
                    alt="poster tour dates of allison bamd"
                />
            </div> */}
            <div
                className="py-10 mb-8
                    font-black font-mono italic tracking-widest uppercase
                    relative sm:text-10xl "
            >
                <h1
                    className="  
                        mb-4 text-5xl flex flex-col 
                        "
                >
                    Mermaid calling
                </h1>

                <span
                    className="absolute z-1
                        top-16 right-20 w-innerhit
                        lg:left-60 xl:left-72 
                        tracking-tighter text-white/70 text-6xl"
                >
                    tour 2023
                </span>
            </div>
            {/* <div
                className="absolute  border-b-white/40 border-b-4 top-[196px]
                 right-0 w-[50%] 
                 2xl:w-[35%] 
                 2xl:left-[50%] 
                 "
            ></div> */}
            {tour.map((item) => (
                <CardTour item={item} key={item.id} />
            ))}
        </div>
    )
}

export default Tour
