import express from 'express'
import ordersController from '../controllers/ordersController.js'
const app = express.Router()

app.get('/', ordersController.getOrders)
export default app
