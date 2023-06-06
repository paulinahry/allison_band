import React, { useState } from 'react'
import Hero from '../components/Hero'
import UpcomingEvents from '../components/UpcomingEvents'

function Home() {
    const [showDates, setShowDates] = useState(true)

    function showAllConcerts() {
        // Logic for showing all upcoming tours
    }

    return (
        <div>
            <Hero />
            {showDates ? (
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
        </div>
    )
}

export default Home
