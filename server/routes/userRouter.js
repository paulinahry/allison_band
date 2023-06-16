import express from 'express'
import userController from '../controllers/userController.js'
const app = express.Router()

app.get('/', userController.getUser)
app.get('/logout', userController.logout)
//app.get('/:id', userController.getUserById)
app.post('/login', userController.login)
app.post('/register', userController.register)
app.get('/cart', userController.getCart)
app.post('/add', userController.addToCart)
app.delete('/remove', userController.removeOne)
app.delete('/removeAll', userController.removeAll)

export default app
