const express = require('express')
const app = express()
const port = 3000

const products = [
    { id: 1, title: 'Product 1', price: '100', quantity: 1 },
    { id: 2, title: 'Product 2', price: '200', quantity: 1 },
    { id: 3, title: 'Product 3', price: '300', quantity: 4 },
    { id: 4, title: 'Product 4', price: '400', quantity: 1 },
    { id: 5, title: 'Product 5', price: '500', quantity: 20 },
    { id: 6, title: 'Product 6', price: '600', quantity: 0 },
    { id: 7, title: 'Product 7', price: '700', quantity: 1 },
    { id: 8, title: 'Product 8', price: '800', quantity: 123 },
    { id: 9, title: 'Product 9', price: '900', quantity: 1 },
    { id: 10, title: 'Product 10', price: '1000', quantity: 1 },
    { id: 11, title: 'Product 11', price: '1100', quantity: 1 },
]

app.get('/products', (req, res) => {
    res.send(products)
})

app.get('/products/:id', (req, res) => {
    console.log(req.params.id)
    const productId = parseInt(req.params.id)

    const product = products.find((product) => product.id === productId)
    if (product === undefined) res.status(404).send('sorry, error')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
