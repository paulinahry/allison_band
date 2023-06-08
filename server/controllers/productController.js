import Product from '../models/productModel.js'

// GET all products
const getAllProducts = async (req, res) => {
     await Product.find()

        .then((allProducts) => {
            console.log('products', allProducts)
            res.send(allProducts)
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(500).send('Server Error')
        })
}

// GET products by ID
const getProductById = async (req, res) => {
     await Product.findById(req.params.id)
        .then((prod) => {
            if (!prod) {
                res.status(404).send('Product not found')
            } else {
                res.send(prod)
            }
        })
        .catch((error) => {
            console.log('Error', error)
            res.status(500).send('Server Error')
        })
}

export default {
    getAllProducts,
    getProductById,
}
