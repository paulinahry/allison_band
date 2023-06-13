import React from 'react'
import tour from 'pages/dataTour'
import CardTour from 'components/CardTour'
import { useEffect } from 'react'
import concert from '../assets/images/concert.jpeg'

function Tour() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <img className="h-40 w-full bg-cover bg-center " src={concert} />{' '}
            <div
                className="  text-details 
                    flex flex-col justify-center align-center text-center"
            >
                <div
                    className="py-10 mb-8
                    font-black font-mono italic tracking-widest uppercase
                    relative sm:text-5xl "
                >
                    <h1
                        className="  
                        mb-4 text-5xl flex flex-col 
                        "
                    >
                        Mermaid calling
                    </h1>

                    <span
                        className="absolute z-[-1] 
                        top-16 right-20 w-innerhit
                        lg:left-60 xl:left-72
                        tracking-tighter text-white text-6xl"
                    >
                        tour 2023
                    </span>
                </div>
                <div className="absolute  border-b-white border-b-2 top-32 right-0 w-[60%]"></div>
            </div>
            {tour.map((item) => (
                <CardTour item={item} key={item.id} />
            ))}
        </>
    )
}

export default Tour
