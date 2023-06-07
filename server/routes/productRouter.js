import express from 'express'
import productController from '../controllers/productController.js'

const app = express.Router()

app.get('/', productController.getAllProducts)

export default app
