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
    function getCart() {}
    createAsyncThunk(
        `${name}/getCart`,
        async (_, { rejectWithValue, getState }) => {
            try {
                const { auth } = getState()
                // const authUser = useSelector((s) => s.auth.user)
                const response = await axios.get(
                    `${baseUrl}/user/${auth.user._id}/cart`
                )
                return response.data
            } catch (error) {
                return rejectWithValue(error.response?.data)
            }
        }
    )

    // Todo:
    //add to cart -> store
    //remove

    return {
        getCart: getCart(),
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
