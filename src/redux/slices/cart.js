import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux'

const name = 'cart'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const slice = createSlice({ name, initialState, reducers, extraReducers })
const baseUrl = 'http://localhost:3000'

function createInitialState() {
    let cart = []
    return { cart, loaded: false }
}

function createReducers() {
    return {}
}

function createExtraActions() {
    
     

    

    return {
        //addToCart, remove
    }
}

function extraReducers(builder) {
    const { getCart } = extraActions

    builder
        .addCase(getCart.pending, (state) => {
            state.loaded = false
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload
            state.loaded = true
        })
        .addCase(getCart.rejected, (state) => {
            state.loaded = true
        })
}

export const cartActions = { ...slice.actions, ...extraActions }
export default slice.reducer
