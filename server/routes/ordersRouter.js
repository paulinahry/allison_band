import express from 'express'
import ordersController from '../controllers/ordersController.js'
const app = express.Router()

app.get('/', ordersController.getOrders)
app.get('/:id', ordersController.getUsersOrders)

export default app
