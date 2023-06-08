import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './routes/productRouter.js'
import seed from './routes/seed.js'

dotenv.config()
const app = express()
const port = 3000

// Connect DB
// ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
mongoose.set('strictQuery', false)
mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log('DB connection created'))
    .catch((error) => console.log('Error - database connection:', error))

// Mount the product router
app.use('/seed', seed)
app.use('/products', productRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
