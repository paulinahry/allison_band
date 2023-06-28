import Order from '../models/orderModel.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const tokenLifetime = 10 * 10 * 1000 //10 min, than refresh function with new token
const refreshTokenLifetime = 24 * 60 * 60 * 1000

function generateAccessToken(data, expiresIn) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn })
}

const getOrders = async (req, res) => {
    const orders = await Order.find().populate('items.product').populate('user')
    res.status(200).send(orders)
}

const getUsersOrders = async (req, res) => {
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

        const user = await User.findOne({ _id: tokenData.id }).populate('order')
        res.status(200).send({
            order: user.order,
            messege: 'get user order ',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'An error occuredwhile fetching data',
        })
    }
}

const addOrder = async (req, res) => {
    try {
        const { token } = req.cookies
        let tokenData
        try {
            tokenData = jwt.verify(token, process.env.TOKEN_SECRET)
        } catch (error) {
            return res.sendStatus(401)
        }

        const user = await User.findOne({ _id: tokenData.id }).populate('cart')
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
            message: 'Purchase succeeded',
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            error: 'Internal Server Error: Unable to complete the purchase',
        })
    }
}

export default { getOrders, getUsersOrders, addOrder }
