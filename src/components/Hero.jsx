import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'




function Hero() {


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









// import React, { useEffect, useRef, useState } from 'react';
// import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg';
// import { loadImage, applyTransforms, builtins, generateTransforms } from 'imagetools-core';

// async function applyImageTransforms(image) {
//   const config = {
//     width: '100vh',
//     height: '100vh',
//     format: 'webp',
//   };

//   const { transforms } = generateTransforms(config, builtins);
//   const { image: transformedImage, metadata } = await applyTransforms(transforms, image);

//   return { transformedImage, metadata };
// }

// function Hero() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const loadImageFunc = async () => {
//       try {
//         const image = await loadImage(heroPic);
//         const { transformedImage, metadata } = await applyImageTransforms(image);

//        
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//         console.error('Error loading or transforming image:', error);
//       }
//     };

//     loadImageFunc();
//   }, []);

//   if (loading) {
//     return <Spinner />;
//   }

//   

//   return (
//     <div className="h-screen bg-cover bg-center">
//       <img  className="h-full w-full" src={heroPic} alt="allison" />
//       <div className="text-detailsRed font-semibold tracking-wider flex flex-col justify-self-end m-4">
//         <p className="text-7xl sm:text-9xl">allison</p>
//         <p className="text-5xl sm:text-7xl">Mermaid calling</p>
//         <p className="text-3xl sm:text-5xl tracking-tight text-yellow-300">new album out now</p>
//       </div>
//     </div>
//   );
// }

// export default Hero;
