import React, { useEffect } from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MessageContext = React.createContext(null);

const MessageService = ({children}) => {
    const [message, setMessage] = React.useState(null);

    useEffect(()=>{
        if(!message){
            return
        }
        displayMessage(message)
    }, [message])

    const displayMessage = (messageObject) => {
        const {message, success} = messageObject
        const selectToast = () => {
            if(success === true) {
                return toast.success
            } 
            if(success === false) {
                return toast.error
            }
        }
        selectToast()(message, {toastId: message})
    }

    return(
        <MessageContext.Provider value={{setMessage}}>
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

export default MessageService;




