import React from 'react'
import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'
import { useImage } from 'react-image'
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
    const { src } = useImage({
        srcList: heroPic,
    })

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
        <>
            <div
                className="h-screen w-full bg-cover blur-lg flex flex-col justify-end items-end"
                style={{ backgroundImage: `url(${src})` }}
            ></div>
            <div className="w-[50%] absolute top-[20%] left-[26%] text-center">
                <img src={heroPic} alt="allison band" />
                <div className="bg-black">
                    <h1 className="text-2xl sm:text-3xl p-1">
                        Allison - <span>play new album</span>
                    </h1>
                    <p>choose your music player</p>
                </div>

                <div className="bg-white text-black">
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
        </>
    )
}

export default Music
