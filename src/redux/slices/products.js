import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

const name = 'products'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraAction()
const slice = createSlice({ name, initialState, reducers, extraReducers })
const baseUrl = 'http://localhost:3000/api'

function createInitialState() {
    let products = []
    return { products, loaded: false }
}

function createReducers() {
    return {}
}

function createExtraAction() {
    function getProducts() {
        return createAsyncThunk(
            `${name}/getAllProducts`,
            async ({}, { rejectWithValue }) => {
                try {
                    const response = await axios.get(`${baseUrl}/products`, {
                        products,
                    })
                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    return { getProducts: getProducts() }
}

function extraReducers(builder) {
    const { getProducts } = extraActions

    builder.addCase(getProducts.pending, (state) => {
        const products = action.payload.product
    })
}

export const prodActions = { ...slice.actions, ...extraActions }
export default slice.reducer
