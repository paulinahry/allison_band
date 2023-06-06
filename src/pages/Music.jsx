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
    cursor:'pointer'
}

const Wrapper = ({ children , onClick}) => {
    return   (
    <div style={divStyle} onClick={onClick}>
    {children}
  </div>)
}

function Music() {
    const bgImage = {
        backgroundImage: `url(${heroPic})`,
    }

    const handleLinkClick = (text) => {
        if (text === 'spotify') {
          window.location.href = 'https://spotify.com';
        } else if (text === 'tidal') {
          window.location.href = 'https://tidal.com';
        } else if (text === 'apple') {
          window.location.href = 'https://apple.com';
        } else if (text === 'soundcloud') {
          window.location.href = 'https://soundcloud.com';
        } else if (text === 'deezer') {
          window.location.href = 'https://deezer.com';
        }
      }

    return (
        <>
            <div
                className="h-screen w-full bg-cover blur-lg
    flex flex-col justify-end items-end"
                style={bgImage}
            ></div>
            {/* MEDIA */}
            <div className="w-[40%] relative bottom-[700px] left-[30%]  text-center">
                <img src={heroPic} alt="allison band" />
                <div className="bg-black">
                    <h1 className=" text-2xl sm:text-3xl p-1 ">
                        Allison - <span>play new album</span>
                    </h1>
                    <p>choose your music player</p>
                </div>
                <div className="bg-white text-black">
                    <Wrapper onClick={() => handleLinkClick('apple')}>
                        <SiApplemusic size={30} className='mr-4'/>
                        <p> apple</p>
                    </Wrapper>
                    <Wrapper onClick={() => handleLinkClick('spotify')}>
                        <BsSpotify size={30} className='mr-4'/>
                        <p>spotify</p>
                    </Wrapper>
                    <Wrapper onClick={() => handleLinkClick('tidal')}>
                        <SiTidal size={30} className='mr-6'/>
                        <p>tidal</p>
                    </Wrapper>
                    <Wrapper onClick={() => handleLinkClick('soundcloud')}>
                        <ImSoundcloud size={30} className='mr-4'/>
                        <p>soundcloud</p>
                    </Wrapper>
                    <Wrapper onClick={() => handleLinkClick('deezer')}>
                        <FaDeezer size={30} className='mr-4'/>
                        <p>deezer</p>
                    </Wrapper>
                </div>
            </div>
        </>
    )
}

export default Music
