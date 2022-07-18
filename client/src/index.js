import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { BrowserRouter } from 'react-router-dom'

import MessageService from './contexts/MessageService'
import AuthenticationService from './contexts/AuthenticationService'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <AuthenticationService>
        <MessageService>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MessageService>
    </AuthenticationService>
)
