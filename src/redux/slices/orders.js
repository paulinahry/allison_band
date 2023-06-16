import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const name = 'orders'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const slice = createSlice({ name, initialState, reducers, extraReducers })
const baseUrl = 'http://localhost:3000'

function createInitialState() {
    let orders = []
    return { orders, loaded: false }
}

function createReducers() {
    return {}
}

function createExtraActions() {
    //get orders
    function getUserOrders() {
        return createAsyncThunk(
            `${name}/getUserOrders`,
            async (_, { rejectWithValue }) => {
                try {
                    const response = await axios.get(`${baseUrl}/user/orders`)
                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    return {
        getUserOrders: getUserOrders(),
    }
}

function extraReducers(builder) {
    const { getUserOrders } = extraActions

    builder
        .addCase(getUserOrders.pending, (state) => {
            state.loaded = false
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload
            state.loaded = true
        })
        .addCase(getUserOrders.rejected, (state) => {
            state.loaded = true
        })
}

export const orderActions = { ...slice.actions, ...extraActions }
export default slice.reducer
