import React, { useState } from 'react'
import Hero from '../components/Hero'
import UpcomingEvents from '../components/UpcomingEvents'

function Home() {
    const [showUpcomingEvents, setShowUpcomingEvents] = useState(true)

    return (
        <div>
            <Hero />

            {/* UPCOMING EVENTS */}
            {showUpcomingEvents ? (
                <div>
                    <UpcomingEvents />
                    <button
                        className=" border-solid border-2"
                        onClick={showAllConcerts}
                    >
                        Show All Upcoming
                    </button>
                </div>
            ) : (
                <p>Current Tour is already over</p>
            )}
            {/*  UPCOMING EVENTS END */}
        </div>
    )
}

export default Home
