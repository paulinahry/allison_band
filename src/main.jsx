import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import { BrowserRouter as Router } from 'react-router-dom'

axios.defaults.withCredentials = true
if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
