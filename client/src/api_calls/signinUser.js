import axios from 'axios'
import config from '../util/config'

import {Error, Success} from '../util/ResponseClasses'

const signinUser = async (credentials) => {
    try{
        const url = `${config.API_ADDRESS}/api/signin`
        const response = await axios.post(url, credentials)
        return new Success(response.status, 'User succesfully created', response.data)
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

export default signinUser;