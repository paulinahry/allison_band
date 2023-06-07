import express from 'express'
import mongoose from 'mongoose'
import productSchema from './models/Product.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 3000

// Connect to the MongoDB database
mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log('DB connection created'))
    .catch((error) => console.log('Error - database connection:', error))

app.get('/products', (req, res) => {
    productSchema
        .find()
        .then((products) => res.send(products))
        .catch((error) => {
            console.log('Error', error)
            res.status(500).send('Internal Server Error')
        })
})

// app.get('/products/:id', (req, res) => {
//     const productId = parseInt(req.params.id)

//     productSchema
//         .findOne({ _id: productId })
//         .then((product) => {
//             if (!product) {
//                 res.status(404).send('Product not found')
//             } else {
//                 res.send(product)
//             }
//         })
//         .catch((error) => {
//             console.log('Error - retrieving product:', error)
//             res.status(500).send('Internal Server Error')
//         })
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
