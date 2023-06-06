import React from 'react'
import tour from '../pages/dataTour'
import CardTour from '../components/CardTour'

function Tour() {
    return (
        <div className="flex justify-center align-center text-center">
            <div className="py-10 text-detailsRed md:w-[80%]">
                <h2 className="uppercase font-bold text-3xl ">
                    Mermaid calling tour 2023
                </h2>

                {tour.map((item) => (
                    <CardTour item={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default Tour
