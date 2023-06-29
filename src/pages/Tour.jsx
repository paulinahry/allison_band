import React from 'react'
import tour from 'pages/dataTour'
import CardTour from 'components/CardTour'
import poster from '../assets/images/tour.jpg'

function Tour() {
    return (
        <div
            className="  text-details bg-main
                    flex flex-col justify-center align-center text-center pb-5"
        >
            <div>
                <img
                    className="w-full h-full object-cover"
                    src={poster}
                    alt="poster tour dates of allison bamd"
                />
            </div>
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

            {tour.map((item) => (
                <CardTour item={item} key={item.id} />
            ))}
        </div>
    )
}

export default Tour
