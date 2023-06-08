import mongoose from 'mongoose'

const { Schema } = mongoose
const paymenstSchema = new Schema({
    userId: { type: String },
    typeOfPayment: { type: String },
    card: [
        {
            typeOfCard: { type: String },
            cardNumber: { type: String }, // only last numbers
            expiryMonth: { type: Number },
            expiryYear: { type: Number },
            cvv: { type: Number }, // later status e.g : verified // bcrypt ??
        },
    ],
})
