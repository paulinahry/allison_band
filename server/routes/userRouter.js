import express from 'express'
import userController from '../controllers/userController.js'
const app = express.Router()

app.get('/', userController.getUser)
app.get('/logout', userController.logout)
//app.get('/:id', userController.getUserById)
app.post('/login', userController.login)
app.post('/register', userController.register)
app.post('/cart', userController.getCart)
app.post('/cart/add', userController.addToCart)
app.post('/cart/remove', userController.removeOne)
app.delete('/cart/removeAll', userController.removeAll)

export default app
