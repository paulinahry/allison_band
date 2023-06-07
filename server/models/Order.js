import mongoose from 'mongoose'

const { Schema } = mongoose
const orderSchema = new Schema({
    items: {
        title: { type: String },
        description: { type: String },
        amout: { type: Number },
        price: { type: Number },
    },
    finalPrice: { type: Number },
})

export default mongoose.model('Order', orderSchema)
