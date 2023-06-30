import mongoose from 'mongoose'

const { Schema } = mongoose
const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            amount: { type: Number },
        },
    ],
    finalPrice: { type: Number },
})

const Order = mongoose.model('Order', orderSchema)
export default Order
