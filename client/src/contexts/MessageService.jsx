import React, { useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const MessageContext = React.createContext(null)

const MessageService = ({ children }) => {
    const displayMessage = (message, messageType) => {
        const selectToast = () => {
            if (messageType === 'success') {
                return toast.success
            }
            if (messageType === 'error') {
                return toast.error
            }
        }
        selectToast()(message, { toastId: message })
    }

    return (
        <MessageContext.Provider value={{ displayMessage }}>
            {children}
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                limit={2}
            />
        </MessageContext.Provider>
    )
}

export default MessageService
