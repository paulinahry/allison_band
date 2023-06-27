import React, { useState } from 'react'
import Hero from 'components/Hero'
import UpcomingEvents from 'components/UpcomingEvents'
import Info from '../components/Info'

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
            <Info />
        </>
    )
}

export default Home
