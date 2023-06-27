import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { authActions } from './auth'
import { orderActions } from './orders'

const name = 'cart'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const slice = createSlice({ name, initialState, reducers, extraReducers })
const baseUrl = 'http://localhost:3000/api/cart'

function createInitialState() {
    let cart = []
    let loaded = false
    let error = null
    let updateHash = null
    let orders = []
    return { cart, loaded, error, updateHash, orders }
}

function createReducers() {
    function setCart(state, { payload }) {
        state.cart = payload
    }

    function setUpdateHash(state, { payload }) {
        state.updateHash = payload
    }

    return {
        setCart,
        setUpdateHash,
    }
}

function createExtraActions() {
    function addToCart(productId) {
        return createAsyncThunk(
            `${name}/addToCart`,
            async ({ id: productId }, { rejectWithValue, dispatch }) => {
                try {
                    const updateHash = Math.floor(Math.random() * 9000)
                    dispatch(cartActions.setUpdateHash(updateHash))
                    const response = await axios.post(`${baseUrl}/add`, {
                        productId,
                        updateHash,
                    })
                    return response.data
                } catch (error) {
                    console.log(error)
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    function removeOne(productId) {
        return createAsyncThunk(
            `${name}/removeOne`,
            async ({ id: productId }, { rejectWithValue, dispatch }) => {
                try {
                    const updateHash = Math.floor(Math.random() * 9000)
                    dispatch(cartActions.setUpdateHash(updateHash))

                    const response = await axios.post(`${baseUrl}/remove`, {
                        productId,
                        updateHash,
                    })
                    return response.data
                } catch (error) {
                    console.log(error)
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    function removeAll() {
        return createAsyncThunk(
            `${name}/user/removeAllFromCart`,
            async (_, { rejectWithValue }) => {
                try {
                    const response = await axios.delete(`${baseUrl}/removeAll`)
                    return response.data
                } catch (error) {
                    console.log(error)
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    // function buy() {
    //     return createAsyncThunk(
    //         `${name}/user/buy`,
    //         async ({ _id: orderId }, { rejectWithValue }) => {
    //             try {
    //                 const response = await axios.delete(`${baseUrl}/buy`, {
    //                     orderId,
    //                 })

    //                 return response.data
    //             } catch (error) {
    //                 console.log(error)
    //                 return rejectWithValue(error.response?.data)
    //             }
    //         }
    //     )
    // }

    return {
        addToCart: addToCart(),
        removeOne: removeOne(),
        removeAll: removeAll(),
        // buy: buy(),
    }
}

function extraReducers(builder) {
    const { addToCart, removeOne, removeAll, buy } = extraActions
    //addToCart
    builder
        .addCase(addToCart.pending, (state, action) => {
            const productId = action.meta.arg.id
            const addedItem = state.cart.find((item) => item._id === productId)

            if (addedItem) {
                addedItem.amount++
            } else {
                state.cart.push({ _id: productId, amount: 1 })
            }

            state.loaded = false
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            if (
                action.payload.updateHash === state.updateHash &&
                action.payload.cart
            ) {
                state.cart = action.payload.cart
            }
        })
        .addCase(addToCart.rejected, (state) => {
            state.loaded = true
        })

    //removeOne
    builder
        .addCase(removeOne.pending, (state, action) => {
            const productId = action.meta.arg.id
            const removedItem = state.cart.find(
                (item) => item._id === productId
            )

            if (removedItem) removedItem.amount--

            state.loaded = false
        })
        .addCase(removeOne.fulfilled, (state, action) => {
            if (
                action.payload.updateHash === state.updateHash &&
                action.payload.cart
            ) {
                state.cart = action.payload.cart
            }
        })
        .addCase(removeOne.rejected, (state) => {
            state.loaded = true
        })

    // removeAll
    builder
        .addCase(removeAll.pending, (state, action) => {
            state.cart = []
        })
        .addCase(removeAll.fulfilled, (state, action) => {
            state.cart = action.payload.cart
        })

    // // buy
    // builder.addCase(buy.fulfilled, (state, action) => {
    //     state.order.push({ _id: orderId })
    //     state.cart = []
    // })
}

export const cartActions = { ...slice.actions, ...extraActions }
export default slice.reducer
