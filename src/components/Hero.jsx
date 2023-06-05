import React from 'react'
import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'

function Hero() {
    return (
        <div
            className=" h-screen bg-cover bg-center 
            flex flex-col justify-end items-end"
            style={heroPic ? { backgroundImage: `url(${heroPic})` } : {}}
        >
            <div
                className=" 
                text-red-800
                 font-semibold tracking-wider 
<

                flex flex-col  justify-self-end 

                m-4"
            >
                <p className="text-7xl">allison</p>
                <p className="text-5xl">Mermaid calling</p>

                <p className="text-xl tracking-tight text-yellow-300">
                    new album out now
                </p>
            </div>
        </div>
    )
}

export default Hero
