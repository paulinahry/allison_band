import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shippingAdress: [
        {
            street: { type: String },
            houseNum: { type: Number },
            zip: { type: Number },
            country: { type: String },
        },
    ],
    orders: [
        {
            items: {
                title: { type: String },
                description: { type: String },
                amount: { type: Number },
                price: { type: Number },
            },
            finalPrice: { type: Number },
        },
    ],
})

export default mongoose.model('User', userSchema, 'users')
