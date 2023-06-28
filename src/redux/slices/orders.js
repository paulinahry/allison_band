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
    function setOrder(state, { payload }) {
        state.order = payload
    }

    return {
        setOrder,
    }
}

function createExtraActions() {
    //get orders

    function getOrders() {
        return createAsyncThunk(
            `${name}/getOredrs`,
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    const response = await axios.get(
                        `${baseUrl}/orders/getOrders`
                    )
                    dispatch(orderActions.setOrder(response.data.order))

                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    function addOrder(order) {
        return createAsyncThunk(
            `${name}/addOrder`,
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    const response = await axios.post(
                        `${baseUrl}/orders/addOrder`
                    )

                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    return {
        getOrders: getOrders(),
        addOrder: addOrder(),
    }
}

function extraReducers(builder) {
    const { getUserOrders, getOrders, addOrder } = extraActions

    builder
        .addCase(getOrders.fulfilled, (state, action) => {
            state.products = action.payload
            state.loaded = true
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.error = action.payload
        })

    builder
        .addCase(addOrder.fulfilled, (state, action) => {
            state.products = action.payload
            state.loaded = true
        })
        .addCase(addOrder.rejected, (state, action) => {
            state.error = action.payload
        })
}

export const orderActions = { ...slice.actions, ...extraActions }
export default slice.reducer
