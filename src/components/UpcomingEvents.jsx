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
            <div className="py-10 text-details ">
                <h2 className="uppercase font-bold text-3xl">
                    Upcoming events
                </h2>
                <div className="flex justify-end ">
                    <button
                        className=" underline  cursor-pointer"
                        onClick={navigateToTour}
                    >
                        Show all
                    </button>
                </div>

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
