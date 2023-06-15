import { configureStore } from '@reduxjs/toolkit'

import auth from 'slices/auth'
import prod from 'slices/products'
import ord from 'slices/orders'
// import cart from 'slices/cart'

export * from 'slices/auth'
export * from 'slices/products'
export * from 'slices/orders'
// export * from 'slices/cart'

const store = configureStore({
    reducer: {
        auth,
        prod,
        ord,
        // cart,
    },
})

export default store
