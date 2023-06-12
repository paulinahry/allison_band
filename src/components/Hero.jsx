import React from 'react'
import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'

// import {
//     loadImage,
//     applyTransforms,
//     builtins,
//     generateTransforms,
//     parseURL,
//     resolveConfigs,
// } from 'imagetools-core'

function Hero() {
    // const src = loadImage(`${heroPic}`)
    // const config = {
    //     width: '100%',
    //     height: '100vh',
    //     format: 'webp',
    // }

    // const { transforms, warnings } = generateTransforms(config, builtins)
    // const { src: transformedImage, metadata } = applyTransforms(transforms, src)

    // const src = new URL(
    //     `/src/assets/images/pexels-brett-sayles-2479312.jpg?w=100vw&format=webp`
    // )
    // const parameters = parseURL(src)
    // const configs = resolveConfigs(parameters)

    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col justify-end items-end"
            style={{ backgroundImage: `url(${heroPic})` }}
        >
            <div className="text-detailsRed font-semibold tracking-wider flex flex-col justify-self-end m-4">
                <p className="text-7xl sm:text-9xl">allison</p>
                <p className="text-5xl sm:text-7xl">Mermaid calling</p>
                <p className="text-3xl sm:text-5xl tracking-tight text-yellow-300">
                    new album out now
                </p>
            </div>
        </div>
    )
}

export default Hero
