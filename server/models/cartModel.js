import mongoose from 'mongoose'

const { Schema } = mongoose

const shoppingCartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
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
})

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema)
export default ShoppingCart