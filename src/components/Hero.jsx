import React from 'react'
import { useImage } from 'react-image'
import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'

function Hero() {
    const { src } = useImage({
        srcList: heroPic,
    })

    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col justify-end items-end"
            style={{ backgroundImage: `url(${src})` }}
        >
            <div className="text-detailsRed font-semibold tracking-wider flex flex-col justify-self-end m-4">
                <p className="text-7xl sm:text-9xl">allison </p>
                <p className="text-5xl sm:text-7xl">Mermaid calling</p>
                <p className="text-3xl sm:text-5xl tracking-tight text-yellow-300">
                    new album out now
                </p>
            </div>
        </div>
    )
}

export default Hero
