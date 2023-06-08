import Product from '../models/productModel.js'

// GET all products
const getAllProducts = async (req, res) => {
    const allProducts = await Product.find()

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
    const prod = await Product.findById(req.params.id)
        .then((product) => {
            if (!product) {
                res.status(404).send('Product not found')
            } else {
                res.send(product)
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
