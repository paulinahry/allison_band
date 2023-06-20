import express from 'express'
import userController from '../controllers/userController.js'
import authTokenMiddleware from '../middlewares/token.middleware.js'
const app = express.Router()

app.get('/', userController.getUser)
app.get('/logout', userController.logout)
//app.get('/:id', userController.getUserById)
app.post('/login', userController.login)
app.post('/login/refresh-token', userController.refresh)
app.post('/register', userController.register)
app.get('/cart', authTokenMiddleware, userController.getCart)
app.post('/cart/add', authTokenMiddleware, userController.addToCart)
app.post('/cart/remove', authTokenMiddleware, userController.removeOne)
app.delete('/cart/removeAll', authTokenMiddleware, userController.removeAll)

export default app
