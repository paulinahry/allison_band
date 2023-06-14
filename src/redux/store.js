import { configureStore } from '@reduxjs/toolkit'

import auth from 'slices/auth'
import prod from 'slices/products'

export * from 'slices/auth'
export * from 'slices/products'

const store = configureStore({
    reducer: {
        auth,
        prod,
    },
})

export default store
