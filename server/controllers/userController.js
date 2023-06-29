import User from '../models/userModel.js'
import Order from '../models/orderModel.js'

import jwt from 'jsonwebtoken'

const tokenLifetime = 60 * 60 * 1000 //1h, than refresh function with new token
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
    res.clearCookie('token')
    res.clearCookie('refreshToken')
    res.status(200).send()
}

const refresh = async (req, res) => {
    const { refreshToken } = req.cookies
    if (refreshToken == null) return res.sendStatus(401)

    let tokenData
    try {
        tokenData = jwt.verify(refreshToken, process.env.TOKEN_SECRET)
    } catch (e) {
        return res.sendStatus(401)
    }

    try {
        const user = await User.findOne({ _id: tokenData.id }).exec()
        if (!user) {
            throw new Error('USER NOT FOUND')
        }
    } catch (error) {
        return res.sendStatus(401)
    }

    const token = generateAccessToken({ id: tokenData.id }, tokenLifetime)
    const newRefreshToken = generateAccessToken(
        { id: tokenData.id },
        refreshTokenLifetime
    )

    res.cookie('token', token, {
        maxAge: tokenLifetime,
        httpOnly: true,
    })

    res.cookie('refreshToken', newRefreshToken, {
        maxAge: refreshTokenLifetime,
        httpOnly: true,
    })

    res.json({
        error: 0,
    })
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
        const { token } = req.cookies
        let tokenData
        try {
            jwt.verify(token, String(process.env.TOKEN_SECRET), (err, data) => {
                if (err || !data) {
                    throw new Error(err)
                }
                tokenData = data
            })
        } catch (error) {
            return res.sendStatus(401)
        }

        const user = await User.findOne({ _id: tokenData.id }).populate('cart')

        res.status(200).send({
            cart: user.cart,
            message: 'Cart successfully displayed',
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
        const { productId, amount = 1, updateHash } = req.body

        const { token } = req.cookies
        let tokenData
        try {
            jwt.verify(token, String(process.env.TOKEN_SECRET), (err, data) => {
                if (err || !data) {
                    throw new Error(err)
                }
                tokenData = data
            })
        } catch (error) {
            return res.sendStatus(401)
        }

        let user = await User.findOne({ _id: tokenData.id })

        let existingProductIndex = null

        if (!user.cart) user.cart = []

        // existingProductIndex = user.cart.findIndex((productInCart) =>  productInCart === productId)

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

        user = await User.findOne({ _id: tokenData.id }).lean()

        res.status(200).send({
            cart: user.cart,
            message: 'Product added to cart',
            updateHash,
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
        const { productId, updatedHash } = req.body

        const { token } = req.cookies
        let tokenData
        try {
            jwt.verify(token, String(process.env.TOKEN_SECRET), (err, data) => {
                if (err || !data) {
                    throw new Error(err)
                }
                tokenData = data
            })
        } catch (error) {
            return res.sendStatus(401)
        }

        let user = await User.findOne({ _id: tokenData.id }).populate('cart')

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }

        const targetItem = user.cart.find((item) => item.id === productId)
        if (targetItem.amount > 1) {
            targetItem.amount--
        }

        //else {
        //     user.cart = user.cart.filter((item) => item.amount > 1)
        // }

        await user.save()
        user = await User.findOne({ _id: tokenData.id }).populate('cart').lean()

        res.status(200).send({
            message: 'Product removed from cart',
            cart: user.cart,
            updatedHash,
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
        const { token } = req.cookies
        let tokenData
        try {
            jwt.verify(token, String(process.env.TOKEN_SECRET), (err, data) => {
                if (err || !data) {
                    throw new Error(err)
                }
                tokenData = data
            })
        } catch (error) {
            return res.sendStatus(401)
        }

        let user = await User.findOne({ _id: tokenData.id }).populate('cart')

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

const buy = async (req, res) => {
    try {
        const { token } = req.cookies
        let tokenData
        try {
            tokenData = jwt.verify(token, process.env.TOKEN_SECRET)
        } catch (error) {
            return res.sendStatus(401)
        }

        const user = await User.findOne({ _id: tokenData.id })
            .populate('cart')
            .populate('orders')
        const userOrder = await Order.find().populate('user')

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }

        const products = user.cart
        const order = new Order({
            user: user._id,
            items: products.map((prod) => ({
                product: prod._id,
                amount: prod.amount,
            })),
        })

        await order.save()

        user.order = order
        user.cart = []

        await user.save()

        res.status(200).send({
            userOrder: order,
            message: 'Order succeeded',
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            error: 'Internal Server Error: Unable to complete the purchase',
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
    refresh,
    buy,
}
