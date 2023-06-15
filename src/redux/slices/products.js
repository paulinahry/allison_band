import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

const name = 'products'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraAction()
const slice = createSlice({ name, initialState, reducers, extraReducers })
const baseUrl = 'http://localhost:3000'

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
            async (_, { rejectWithValue }) => {
                try {
                    const response = await axios.get(`${baseUrl}/products`)
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

    builder
        .addCase(getProducts.pending, (state) => {
            // false before fetching products
            state.loaded = false
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            // new with fetched products
            state.products = action.payload
            state.loaded = true
        })
        .addCase(getProducts.rejected, (state, action) => {
            //  true if the request is rejected
            state.loaded = true
        })
}

export const prodActions = { ...slice.actions, ...extraActions }
export default slice.reducer
