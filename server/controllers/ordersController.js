import Order from '../models/orderModel.js'

const getOrders = async (req, res) => {
    const orders = await Order.find().populate('items.product').populate('user')
    res.status(200).send(orders)
}

// const getUsersOrders = async (req, res) => {
//     const order = await Order.findById(req.params.id).populate('user')
//     res.status(200).send(order)
// }
// 
// 
const getUsersOrders = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('user')
        .populate('items.product')
  
      const populatedOrder = {
        ...order.toObject(),
        items: order.items.map((item) => ({
          ...item.toObject(),
          product: item.product,
        })),
      }
  
      res.status(200).send(populatedOrder)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'An error occurred while fetching the order' })
    }
  }
export default { getOrders, getUsersOrders }
