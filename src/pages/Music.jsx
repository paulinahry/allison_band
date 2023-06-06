import React from 'react'
import heroPic from '/src/assets/images/pexels-brett-sayles-2479312.jpg'
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
}

const Wrapper = ({ children }) => {
    return <div style={divStyle}>{children}</div>
}

function Music() {
    const bgImage = {
        backgroundImage: `url(${heroPic})`,
    }
    return (
        <>
            <div
                className="h-screen w-full bg-cover blur-lg
    flex flex-col justify-end items-end"
                style={bgImage}
            ></div>
            {/* MEDIA */}
            <div className="w-[40%] relative bottom-[900px] left-[30%]  text-center">
                <img src={heroPic} alt="allison band" />
                <div className="bg-black">
                    <h1 className=" text-2xl sm:text-3xl p-1 ">
                        Allison - <span>play new album</span>
                    </h1>
                    <p>choose your music player</p>
                </div>
                <div className="bg-white text-black">
                    <Wrapper>
                        <SiApplemusic size={30} />
                        <p> apple music</p>
                    </Wrapper>
                    <Wrapper>
                        <BsSpotify size={30} />
                        <p>spotify</p>
                    </Wrapper>
                    <Wrapper>
                        <SiTidal size={30} />
                        <p>tidal</p>
                    </Wrapper>
                    <Wrapper>
                        <ImSoundcloud size={30} />
                        <p>soundcloud</p>
                    </Wrapper>
                    <Wrapper>
                        <FaDeezer size={30} />
                        <p>deezer</p>
                    </Wrapper>
                </div>
            </div>
        </>
    )
}

export default Music
