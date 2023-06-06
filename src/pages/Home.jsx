import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import UpcomingEvents from '../components/UpcomingEvents'

function Home() {
    const [showUpcomingEvents, setShowUpcomingEvents] = useState(true)
    const navigate = useNavigate()

    function navigateToTour() {
        navigate('/tour')
    }

    return (
        <div>
            <Hero />

            {/* UPCOMING EVENTS */}
            {showUpcomingEvents ? (
                <div>
                    <UpcomingEvents />
                    <button className=" underline " onClick={navigateToTour}>
                        Show all upcoming events
                    </button>
                </div>
            ) : (
                <p className="italic text-sm">Current Tour is already over</p>
            )}
            {/*  UPCOMING EVENTS END */}
        </div>
    )
}

export default Home
