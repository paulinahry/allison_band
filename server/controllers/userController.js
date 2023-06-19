import cart from '../../src/redux/slices/cart.js'
import User from '../models/userModel.js'

const getUser = async (req, res) => {
    try {
        const user = await User(req.user)
        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'An error occurred ' })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate(
            'orders'
        )

        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'An error occurred ' })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body ?? {}

    try {
        const user = await User.findOne({ email }).populate('orders').lean()
        if (!user) {
            return res.status(401).json({ error: 'Login incorrect' })
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Password incorrect' })
        }

        delete user.password
        res.status(200).json({ message: 'Login successful', user })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'An error occurred during login' })
    }
}
const logout = async (req, res) => {
    res.status(200).send()
}

const register = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(200).send({ message: 'User registered correctly' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'An error occurred during registration' })
    }
}

//--------------- user actions in cart ------------------

const getCart = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('cart')

        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({
            error: 'An error occurred while fetching the cart',
        })
    }
}
const addToCart = async (req, res) => {
    try {
        const { productId, userId, amount = 1 } = req.body

        let user = await User.findOne({ _id: userId })

        let existingProductIndex = null

        if (!user.cart) user.cart = []

        user.cart.forEach((productInCart, i) => {
            if (productInCart.id === productId) {
                existingProductIndex = i
                return
            }
        })

        if (existingProductIndex != null) {
            user.cart[existingProductIndex].amount++
        } else {
            user.cart.push({ _id: productId, amount })
        }

        await user.save()

        user = await User.findOne({ _id: userId }).lean()

        res.status(200).send({
            cart: user.cart,
            message: 'Product added to cart',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Internal Server Error: product can`t be added to the cart',
        })
    }
}

const removeOne = async (req, res) => {
    try {
        const { productId } = req.body
        const user = await User.findOne({ _id: req.params.id })

        user.cart = user.cart.filter((item) => item.product._id !== productId)
        await user.save()

        res.status(200).send({ message: 'Product removed from cart' })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Internal Server Error: product not removed from cart',
        })
    }
}

const removeAll = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        user.cart = []
        await user.save()

        res.status(200).send({ message: 'Cart is empty' })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Internal Server Error: cannot empty the cart',
        })
    }
}

//--------------- user actions in cart  end ------------------

export default {
    getUser,
    getUserById,
    login,
    logout,
    register,
    getCart,
    addToCart,
    removeOne,
    removeAll,
}
