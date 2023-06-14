import User from '../models/userModel.js'

const getUser = async (req, res) => {
    const user = await User(req.user)
    res.status(200).send(user)
}

const getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).populate('orders')

    res.status(200).send(user)
}

const login = async (req, res) => {
    const { email, password } = req.body ?? {}

    try {
        const user = await User.findOne({ email }).populate('orders').lean()

        if (!user) {
            return res.status(401).json({ error: 'Login incorrect' })
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Login incorrect' })
        }

        delete user.password

        res.status(200).json({ message: 'Login successful', user })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred during login' })
    }
}

export default { getUser, getUserById, login }
