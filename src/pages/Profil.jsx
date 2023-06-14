import { useData } from '../context/UseContext'
import CardOrders from '../components/CardOrders'

const Profil = () => {
    const { userOrders, user } = useData()

    if (!user) {
        return <p>User not logged in</p>
    }

    if (!userOrders) {
        return <p>No orders</p>
    }

    return (
        <div className="profil h-screen bg-gray-200">
            <div className="pt-10">
                <p className="text-main">Your current orders:</p>
                {userOrders.map((order) => (
                    <CardOrders key={order._id} orders={order} />
                ))}
            </div>
        </div>
    )
}

export default Profil
