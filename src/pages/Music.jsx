import React from 'react'
import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'
import concert from '/src/assets/images/concert.jpeg'
import { BsSpotify } from 'react-icons/bs'
import { SiTidal } from 'react-icons/si'
import { ImSoundcloud } from 'react-icons/im'
import { SiApplemusic } from 'react-icons/si'
import { FaDeezer } from 'react-icons/fa'

const divStyle = {
    borderBottom: '0.5px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    marginRight: '4px',
    textAlign: 'center',
    cursor: 'pointer',
}

const Wrapper = ({ children, onClick }) => {
    return (
        <div style={divStyle} onClick={onClick}>
            {children}
        </div>
    )
}

function Music() {
    const handleLinkClick = (url) => {
        window.location.href = url
    }

    const musicPlayers = [
        {
            name: 'apple',
            icon: <SiApplemusic size={30} className="mr-4" />,
            url: 'https://apple.com',
        },
        {
            name: 'spotify',
            icon: <BsSpotify size={30} className="mr-4" />,
            url: 'https://spotify.com',
        },
        {
            name: 'tidal',
            icon: <SiTidal size={30} className="mr-6" />,
            url: 'https://tidal.com',
        },
        {
            name: 'soundcloud',
            icon: <ImSoundcloud size={30} className="mr-4" />,
            url: 'https://soundcloud.com',
        },
        {
            name: 'deezer',
            icon: <FaDeezer size={30} className="mr-4" />,
            url: 'https://deezer.com',
        },
    ]

    return (
        <div className="m-auto flex flex-col justify-center items-center ">
            <img
                className=" h-screen w-full 
                bg-cover bg-center blur sepia "
                src={heroPic}
                alt="allison band"
            ></img>

            <div
                className="absolute  top-[12%] 
                            w-[600px]
                            text-center m-auto"
            >
                <img
                    src={concert}
                    alt="allison band"
                    className=" bg-contain  h-[400px] "
                />
                <div className="bg-black text-details">
                    <h1 className="text-2xl sm:text-3xl p-1">
                        Allison - <span>play new album</span>
                    </h1>
                    <p>choose your music player</p>
                </div>

                <div className="bg-white text-main">
                    {musicPlayers.map((player) => (
                        <Wrapper
                            key={player.name}
                            onClick={() => handleLinkClick(player.url)}
                        >
                            {player.icon}
                            <p>{player.name}</p>
                        </Wrapper>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Music
