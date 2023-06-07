import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
})

export default mongoose.model('Product', productSchema)
