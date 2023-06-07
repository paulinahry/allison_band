import mongoose from 'mongoose'

const { Schema } = mongoose

const cartSchema = new Schema({
    items: {
        title: { type: String },
        description: { type: String },
        price: { type: Number },
        amount: { type: Number },
    },
})

export default mongoose.model('Cart', cartSchema, 'cart')
