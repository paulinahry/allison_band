import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const tokenLifetime = 60 * 60 * 1000
const refreshTokenLifetime = 24 * 60 * 60 * 1000

function generateAccessToken(data, expiresIn) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn })
}

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

        const token = generateAccessToken({ id: user._id }, tokenLifetime)
        const refreshToken = generateAccessToken(
            { id: user._id },
            refreshTokenLifetime
        )

        res.cookie('token', token, {
            maxAge: tokenLifetime,
            httpOnly: true,
        })

        res.cookie('refreshToken', refreshToken, {
            maxAge: refreshTokenLifetime,
            httpOnly: true,
        })

        res.json({ message: 'Login successful', user })
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
        const { userId } = req.body
        const user = await User.findOne({ _id: userId }).populate('cart')

        res.status(200).send({
            cart: user.cart,
            message: 'get user cart',
        })
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
        const { productId, userId } = req.body

        let user = await User.findOne({ _id: userId }).populate('cart')

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }

        const targetItem = user.cart.find((item) => item.id === productId)
        if (targetItem.amount > 1) {
            targetItem.amount--
        } else {
            user.cart = user.cart.filter((item) => item.amount > 1)
        }

        await user.save()
        user = await User.findOne({ _id: userId }).populate('cart').lean()

        res.status(200).send({
            message: 'Product removed from cart',
            cart: user.cart,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Internal Server Error: product not removed from cart',
        })
    }
}
const removeAll = async (req, res) => {
    try {
        const { userId } = req.body
        let user = await User.findOne({ _id: userId }).populate('cart')

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }

        user.cart = []
        res.status(200).send({
            message: 'Cart empty',
            cart: user.cart,
        })
        user.save()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Internal Server Error: Unable to empty the cart',
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
