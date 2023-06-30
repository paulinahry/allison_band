import {
    createAsyncThunk,
    createSlice,
    isAsyncThunkAction,
} from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { history } from 'src/helpers'
import store, { authActions as storeActions } from 'src/redux/store'
import { cartActions } from 'slices/cart'

const name = 'auth'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const slice = createSlice({ name, initialState, reducers, extraReducers })
const baseUrl = 'https://allison-band.onrender.com/'

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config
        console.log(error.response.status)
        if (
            error.response.status === 401 &&
            originalRequest.url === `${baseUrl}api/login/refresh-token`
        ) {
            store.dispatch(authActions.logout())
            return Promise.reject(error)
        }

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            return axios
                .post(`${baseUrl}api/login/refresh-token`)
                .then((res) => {
                    if (res.status === 200) {
                        return axios(originalRequest)
                    }
                })
        }
        return Promise.reject(error)
    }
)

function createInitialState() {
    const userData = localStorage.getItem('user')
    let user = null

    if (userData) {
        try {
            user = JSON.parse(userData)
        } catch (error) {
            localStorage.setItem('user', JSON.stringify({}))
            user = null
            console.error('Mismatched local user data')
        }
    }

    return {
        user,
        error: null,
    }
}

function createReducers() {
    return {}
}

function createExtraActions() {
    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ email, password }, { dispatch, rejectWithValue }) => {
                try {
                    const response = await axios.post(`${baseUrl}api/login`, {
                        email,
                        password,
                    })

                    dispatch(cartActions.setCart(response.data.user.cart))
                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`,
            async (_, { rejectWithValue }) => {
                try {
                    const response = await axios.get(`${baseUrl}api/logout`)
                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    function ping() {
        return createAsyncThunk(
            `${name}/ping`,
            async (_, { rejectWithValue }) => {
                try {
                    const response = await axios.get(`${baseUrl}api/ping`)
                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    function register() {
        return createAsyncThunk(
            `${name}/register`,
            async ({ email, password }, { rejectWithValue }) => {
                try {
                    const response = await axios.post(
                        `${baseUrl}api/register`,
                        {
                            email,
                            password,
                        }
                    )
                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    function getCart() {
        return createAsyncThunk(
            `${name}/getCart`,
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    const response = await axios.get(`${baseUrl}api/cart`)
                    dispatch(cartActions.setCart(response.data.cart))

                    return response.data
                } catch (error) {
                    return rejectWithValue(error.response?.data)
                }
            }
        )
    }

    return {
        login: login(),
        logout: logout(),
        ping: ping(),
        register: register(),
        getCart: getCart(),
    }
}

function extraReducers(builder) {
    const { login, logout, ping, register, getCart } = extraActions
    //login
    builder
        .addCase(login.pending, (state) => {
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            const user = action.payload.user

            localStorage.setItem('user', JSON.stringify(user))
            state.user = user

            const { from } = history.location.state || {
                from: { pathname: '/profil' },
            }

            history.navigate(from)
        })
        .addCase(login.rejected, (state, action) => {
            state.error = action.payload
        })

    //register
    builder
        .addCase(register.pending, (state) => {
            state.error = null
        })
        .addCase(register.fulfilled, (state, action) => {
            const user = action.payload.user

            localStorage.setItem('user', JSON.stringify(user))
            state.user = user

            const { from } = history.location.state || {
                from: { pathname: '/store' },
            }

            history.navigate(from)
        })
        .addCase(register.rejected, (state, action) => {
            state.error = action.payload
        })

    //logout
    builder.addCase(logout.fulfilled, (state, action) => {
        state.user = null
        localStorage.removeItem('user')
        history.navigate('/')
    })

    //ping
    builder.addCase(ping.rejected, (state, action) => {
        state.user = null
        localStorage.removeItem('user')
        history.navigate('/')
    })

    //getCart
    builder
        .addCase(getCart.fulfilled, (state, action) => {})
        .addCase(getCart.rejected, (state, action) => {
            state.error = action.payload
        })
}

export const authActions = { ...slice.actions, ...extraActions }
export default slice.reducer
