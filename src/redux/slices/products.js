import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

    function getProductById(productId) {
        return createAsyncThunk(
            `${name}/getProductById`,
            async (_, { rejectWithValue }) => {
                try {
                    const response = await axios.post(
                        `${baseUrl}/products/${productId}}`
                    )
                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    return { getProducts: getProducts(), getProductById: getProductById() }
}

function extraReducers(builder) {
    const { getProducts, getProductById } = extraActions

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
        .addCase(getProducts.rejected, (state) => {
            //  true if the request is rejected
            state.loaded = true
        })

    builder.addCase(getProductById.fulfilled, (state, action) => {
        // const productId = action.meta.arg.id
        // const productWithId = state.products.find(
        //     (item) => item._id === productId
        // )
        // if (productWithId)
        state.product = action.payload
        state.loaded = true
    })
}

export const prodActions = { ...slice.actions, ...extraActions }
export default slice.reducer
