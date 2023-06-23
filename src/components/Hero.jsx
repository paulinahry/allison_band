import { useNavigate } from 'react-router-dom'
import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'

import { AiOutlineArrowRight } from 'react-icons/ai'

function Hero() {
    const navigate = useNavigate()
    const navigateToMusicPage = () => {
        navigate('/music')
    }

    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col justify-end items-end"
            style={{ backgroundImage: `url(${heroPic})` }}
        >
            <div className="text-details font-semibold tracking-wider flex flex-col justify-self-end m-4">
                <p className="text-7xl sm:text-9xl">allison</p>
                <p className="text-5xl sm:text-7xl">Mermaid calling</p>
                <div className="flex items-center mt-2">
                    <span className="text-3xl sm:text-5xl tracking-tight text-yellowish">
                        new album out now
                    </span>{' '}
                    <button
                        onClick={navigateToMusicPage}
                        className="
                        flex  items-center justify-center ml-4 p-1 w-32
                        rounded-full 

                         text-main bg-details"
                    >
                        listen
                        <AiOutlineArrowRight className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
