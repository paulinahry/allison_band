import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import delay from 'express-delay'
import cookieParser from 'cookie-parser'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import ordersRouter from './routes/ordersRouter.js'
import seed from './routes/seed.js'

dotenv.config()
const app = express()
const port = 3000

if (process.env.ENVIRONMENT === 'development') {
    app.use(delay(100, 1000))
}

// Connect DB
// ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
mongoose.set('strictQuery', false)
mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log('DB connection created'))
    .catch((error) => console.log('Error - database connection:', error))

//access
const corsUrls = process.env.CORS_URLS?.split(',') ?? []

app.use(
    cors({
        origin: corsUrls,
        exposedHeaders: 'Set-Cookie',
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mount the product router
app.use('/seed', seed)
app.use('/products', productRouter)
// app.use('/user', userRouter)
app.use('/user/orders', ordersRouter)
app.use('/api', userRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
