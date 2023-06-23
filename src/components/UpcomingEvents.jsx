import CardTour from './CardTour'
import tour from '../pages/dataTour'
import { useNavigate } from 'react-router-dom'

function UpcomingEvents() {
    const currentDate = new Date()

    const upcomingEvents = tour
        .filter((item) => item.date >= currentDate)
        .slice(0, 3)

    const navigate = useNavigate()

    function navigateToTour() {
        navigate('/tour')
    }

    return (
        <div className="flex justify-center align-center text-center">
            <div className="py-10 text-details w-full bg-white">
                <h2
                    className="uppercase font-thin font-mono 
                text-3xl sm:text-4xl "
                >
                    Upcoming events
                </h2>

                <a
                    className=" underline  cursor-pointer "
                    onClick={navigateToTour}
                >
                    Show all
                </a>

                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((item) => (
                        <CardTour item={item} key={item.id} />
                    ))
                ) : (
                    <p className="italic text-sm">
                        No upcoming events at the moment.
                    </p>
                )}
            </div>
        </div>
    )
}

export default UpcomingEvents
