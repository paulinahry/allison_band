import User from '../models/userModel.js'

const getUser = async (req, res) => {
    const user = await User(req.user)
    res.status(200).send(user)
}

const getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).populate('orders')

    res.status(200).send(user)
}

export default { getUser, getUserById }
