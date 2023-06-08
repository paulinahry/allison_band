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
            amout: { type: Number },
            price: { type: Number },
        },
    ],
    finalPrice: { type: Number },
})

export default mongoose.model('Order', orderSchema)
