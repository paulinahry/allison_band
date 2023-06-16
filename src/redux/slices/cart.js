import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const name = 'cart'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const slice = createSlice({ name, initialState, reducers, extraReducers })
const baseUrl = 'http://localhost:3000/api'

function createInitialState() {
    let cart = []
    let loaded = false
    return { cart, loaded }
}

function createReducers() {
    return {}
}

function createExtraActions() {
    const addToCart = createAsyncThunk(
        `${name}/addToCart`,
        async (_, { rejectWithValue }) => {
            try {
                const response = await axios.post(`${baseUrl}/add`)
                return response.data
            } catch (error) {
                return rejectWithValue(error.response?.data)
            }
        }
    )

    const removeOne = createAsyncThunk(
        `${name}/removeOneFromCart`,
        async (_, { rejectWithValue }) => {
            try {
                const response = await axios.delete(`${baseUrl}/remove`)
                return response.data
            } catch (error) {
                return rejectWithValue(error.response?.data)
            }
        }
    )

    const removeAll = createAsyncThunk(
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

    return {
        addToCart: addToCart(),
        removeOne: removeOne(),
        removeAll: removeAll(),
    }
}

function extraReducers(builder) {
    const { addToCart, removeOne, removeAll } = extraActions
    console.log(addToCart)
    //addToCart
    builder
        .addCase(addToCart.pending, (state) => {
            state.loaded = false
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loaded = true
            const addedItem = state.cart.find(
                (item) => item.id === action.payload.id
            )

            if (addedItem) {
                addedItem.quantity++
            } else {
                state.cart.push({ ...action.payload, quantity: 1 })
            }
        })
        .addCase(addToCart.rejected, (state, error) => {
            state.loaded = true
            state.error = action.payload
        })

    //removeOne
    builder
        .addCase(removeOne.pending, (state) => {
            state.loaded = false
        })
        .addCase(removeOne.fulfilled, (state) => {
            state.loaded = true
            const remove = state.cart.filter(
                (item) => item.id !== action.payload
            )
            state.cart = remove
        })
        .addCase(removeOne.rejected, (state, error) => {
            state.loaded = true
            state.error = action.payload
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
            state.error = action.payload
        })
}

export const cartActions = { ...slice.actions, ...extraActions }
export default slice.reducer
