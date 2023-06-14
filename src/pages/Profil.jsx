import CardOrders from '../components/CardOrders'
import Login from './Login'

const Profil = () => {
    const { userOrders, user } = {}

    // if (!user) {
    //     return <Login />
    // }

    // if (!userOrders) {
    //     return <p>No orders</p>
    // }

    return (
        <div className="profil h-screen bg-gray-200 text-white">
            <div className="pt-10">
                <p className="text-main">Your current orders:</p>
                {/* {userOrders.map((order) => (
                    <CardOrders key={order._id} orders={order} />
                ))} */}
            </div>
        </div>
    )
}

export default Profil
