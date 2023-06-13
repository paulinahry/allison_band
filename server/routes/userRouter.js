import express from 'express'
import userController from '../controllers/userController.js'
const app = express.Router()

app.get('/', userController.getUser)
app.get('/:id', userController.getUserById)
app.get('/login', userController.login)

export default app
