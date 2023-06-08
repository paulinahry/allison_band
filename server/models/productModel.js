import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    stock: { type: Number },
    price: { type: Number },
})

const Product = mongoose.model('Product', productSchema)
export default Product
