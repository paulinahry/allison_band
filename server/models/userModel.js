import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
    {
        userName: { type: String },
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
        cart: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                amount: { type: Number },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
)

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
})

const User = mongoose.model('User', userSchema)
export default User
