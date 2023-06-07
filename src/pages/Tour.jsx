import React from 'react'
import tour from '../pages/dataTour'
import CardTour from '../components/CardTour'
import { useEffect } from 'react'

function Tour() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className=" flex justify-center align-center text-center">
            <div className="py-10 text-detailsRed ">
                <h1 className="uppercase font-bold text-3xl mt-20 ">
                    Mermaid calling tour 2023
                </h1>

                {tour.map((item) => (
                    <CardTour item={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default Tour
