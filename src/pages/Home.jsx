import React, { useState } from 'react'
import Hero from 'components/Hero'
import UpcomingEvents from 'components/UpcomingEvents'

function Home() {
    const [showUpcomingEvents] = useState(true)

    if (!showUpcomingEvents) {
        return (
            <>
                <Hero />
                <p className="italic text-details">
                    Current Tour is already over
                </p>
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
