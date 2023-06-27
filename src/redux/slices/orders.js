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
    //add order
    function addOrder() {
        return createAsyncThunk(
            `${name}/addOrder`,
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
        addOrder: addOrder(),
    }
}

function extraReducers(builder) {
    const { getUserOrders, addOrder } = extraActions

    builder
        .addCase(getUserOrders.fulfilled, (state, action) => {
            const { orders } = action.payload
        })
        .addCase(getUserOrders.rejected, (state, action) => {
            state.error = action.payload
        })

    builder.addCase(addOrder.fulfilled, (state, action) => {
        const { order } = action.payload
        state.orders.push(order)
    })
}

export const orderActions = { ...slice.actions, ...extraActions }
export default slice.reducer
