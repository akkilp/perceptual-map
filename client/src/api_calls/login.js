import axios from 'axios'
import config from '../util/config'

import {Error, Success} from '../util/ResponseClasses'

const login = async (credentials) => {
    try{
        const url = `${config.API_ADDRESS}/api/login`
        const response = await axios.post(url, credentials)
        console.log(response)
        return new Success(response.status, `You are logged in succesfully. Hello ${response.data.username}.`, response.data)
    } catch(err){
        if(err.request.status === 400){
            return new Error(err.request.status, 'Sent payload was invalid.')
        } 
        if(err.request.status === 401){
            return new Error(err.request.status, 'Email or username is already taken.')
        }
        
        return new Error(err.request.status, 'Something went wrong in registration.')
    }
}

export default login;