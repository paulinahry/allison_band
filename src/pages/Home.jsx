import React, { useState } from 'react'
import Hero from '../components/Hero'
import UpcomingEvents from '../components/UpcomingEvents'

function Home() {
    const [showUpcomingEvents, setShowUpcomingEvents] = useState(true)
    function showAllConcerts() {}

    return (
        <div>
            <Hero />

            {/* UPCOMING EVENTS */}
            {showUpcomingEvents ? (
                <div>
                    <UpcomingEvents />
                    <button className=" underline " onClick={showAllConcerts}>
                        Show All Upcoming Events
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
