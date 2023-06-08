import express from 'express'
import Product from '../models/productModel.js'
import data from '../data.js'

const seed = express.Router()

seed.get('/', async (req, res) => {
    //products
    await Product.deleteMany({})
    const newProducts = await Product.insertMany(data.products)
    //users
    await User.deleteMany({})
    const newUsers = await User.insertMany(data.users)
    //send all
    res.send({ newProducts, newUsers })
})

export default seed
