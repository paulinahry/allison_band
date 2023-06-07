import Product from '../models/Product.js'

// GET all products
const getAllProducts = (req, res) => {
    Product.find({})
        .then((products) => {
            res.send(products)
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(500).send('Server Error')
        })
}

export default {
    getAllProducts,
}

// app.get('/products/:id', (req, res) => {
//     const productId = parseInt(req.params.id)

//     productSchema
//         .findOne({ _id: productId })
//         .then((product) => {
//             if (!product) {
//                 res.status(404).send('not found')
//             } else {
//                 res.send(product)
//             }
//         })
//         .catch((error) => {
//             console.log('Error', error)
//             res.status(500).send('Server Error')
//         })
// })
