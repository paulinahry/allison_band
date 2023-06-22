import Product from '../models/productModel.js'

const getAllProducts = async (req, res) => {
    await Product.find()

        .then((allProducts) => {
            res.send(allProducts)
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(500).send('Server Error')
        })
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params._id })
        res.status(200).send(product)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Server Error' })
    }
}

export default {
    getAllProducts,
    getProductById,
}
