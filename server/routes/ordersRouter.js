import express from 'express'
import ordersController from '../controllers/ordersController.js'
import authTokenMiddleware from '../middlewares/token.middleware.js'

const app = express.Router()

app.get('/', authTokenMiddleware, ordersController.getOrders)
app.get('/', authTokenMiddleware, ordersController.addOrder)
// app.get('/:id', authTokenMiddleware, ordersController.getUsersOrders)

export default app
