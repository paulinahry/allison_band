import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
    return { cart, loaded, error }
}

function createReducers() {
    function setCart(state, { payload }) {
        state.cart = payload
    }

    return {
        setCart,
    }
}

function createExtraActions() {
    function addToCart(productId) {
        return createAsyncThunk(
            `${name}/addToCart`,
            async ({ id: productId }, { rejectWithValue }) => {
                try {
                    const userData = JSON.parse(localStorage.getItem('user'))

                    if (!userData) throw new Error('invalid user')
                    if (!userData._id) throw new Error('invalid user id')

                    const response = await axios.post(`${baseUrl}/add`, {
                        productId,
                        userId: userData._id,
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
            `${name}/removeOneFromCart`,
            async ({ id: productId }, { rejectWithValue }) => {
                try {
                    const userData = JSON.parse(localStorage.getItem('user'))

                    if (!userData) throw new Error('invalid user')
                    if (!userData._id) throw new Error('inavild user id')

                    const response = await axios.post(`${baseUrl}/remove`, {
                        productId,
                        userId: userData._id,
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
                    const userData = JSON.parse(localStorage.getItem('user'))

                    if (!userData) throw new Error('invalid user')
                    if (!userData._id) throw new Error('inavild user id')

                    const response = await axios.delete(
                        `${baseUrl}/removeAll`,
                        {
                            data: {
                                userId: userData._id,
                            },
                        }
                    )

                    return response.data
                } catch (error) {
                    console.log(error)
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    return {
        addToCart: addToCart(),
        removeOne: removeOne(),
        removeAll: removeAll(),
    }
}

function extraReducers(builder) {
    const { addToCart, removeOne, removeAll } = extraActions
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
            if (action.payload.cart) {
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
            const removedItem = state.cart.find((item) => item.id === productId)
            if (removedItem) removedItem.amount--

            state.loaded = false
        })
        .addCase(removeOne.fulfilled, (state, action) => {
            if (action.payload.cart) {
                state.cart = action.payload.cart
            }
        })
        .addCase(removeOne.rejected, (state) => {
            state.loaded = true
        })

    // removeAll
    builder.addCase(removeAll.fulfilled, (state) => {
        state.cart = []
    })
}

export const cartActions = { ...slice.actions, ...extraActions }
export default slice.reducer
