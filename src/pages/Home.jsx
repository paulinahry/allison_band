import React, { useState } from 'react'
import Hero from '../components/Hero'
import UpcomingEvents from '../components/UpcomingEvents'

function Home() {
    const [showUpcomingEvents, setShowUpcomingEvents] = useState(true)

    if (!showUpcomingEvents) {
        return (
            <>
                <Hero />
                <p className="italic text-sm">Current Tour is already over</p>
            </>
        )
    }

    return (
        <>
            <Hero />
            <UpcomingEvents />
        </>
    )
}

export default Home
