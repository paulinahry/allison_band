import express from 'express'
import userController from '../controllers/userController.js'
const app = express.Router()

app.get('/', userController.getUser)
app.get('/:id', userController.getUserById)

export default app
