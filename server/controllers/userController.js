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
const logout = async (req, res) => {
    res.status(200).send()
}

const register = async (req, res) => {
    const user = new User(req.body)
    res.status(200).send()

    await user.save()
}


const getCart = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('cart.product')
  
      res.status(200).send(user.cart)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'An error occurred while fetching the cart' })
    }
  }

export default { getUser, getUserById, login, logout, register, getCart }
