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
            async (_, { rejectWithValue }) => {
                try {
                    const response = await axios.delete(`${baseUrl}/remove`, {
                        _id: productId,
                    })
                    return response.data
                } catch (error) {
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
                    return []
                } catch (error) {
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
            console.log(action)

            if (action.payload.cart) {
                state.cart = action.payload.cart
            }
        })
        .addCase(addToCart.rejected, (state) => {
            state.loaded = true
        })

    //removeOne
    builder
        .addCase(removeOne.pending, (state) => {
            state.loaded = false
        })
        .addCase(removeOne.fulfilled, (state, action) => {
            state.loaded = true
            const remove = state.cart.filter(
                (item) => item.id !== action.payload
            )
            state.cart = remove
        })
        .addCase(removeOne.rejected, (state) => {
            state.loaded = true
        })

    //removeAll
    builder
        .addCase(removeAll.pending, (state) => {
            state.loaded = false
        })
        .addCase(removeAll.fulfilled, (state, action) => {
            state.cart = action.payload
            state.loaded = true
        })
        .addCase(removeAll.rejected, (state, error) => {
            state.loaded = true
        })
}

export const cartActions = { ...slice.actions, ...extraActions }
export default slice.reducer
