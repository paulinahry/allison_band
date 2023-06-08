import Order from '../models/orderModel.js'
import bcrypt from 'bcrypt'

//populete the items from user and user
const getOrders = async (req, res) => {
    const orders = await Order.find().populate('items.product').populate('user')
    res.status(200).send(orders)
}

export default { getOrders }
