import { query } from 'express'
import Order from '../models/orderModel.js'

const getOrders = async (req, res) => {
    const orders = await Order.find().populate('items.product').populate('user')
    res.status(200).send(orders)
}

const getUsersOrders = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user')
    res.status(200).send(order)
}
export default { getOrders, getUsersOrders }
