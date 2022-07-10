import axios from 'axios'
import config from '../util/config'

import {Error, Success} from '../util/ResponseClasses'

const signinAdmin = async (credentials) => {
    try{
        const url = `${config.API_ADDRESS}/api/signin/admin`
        const response = await axios.post(url, credentials)
        return new Success(response.status, 'Admin user succesfully created', response.data)
    } catch(err){
        if(err.request.status === 400){
            return new Error(err.request.status, 'Sent payload was invalid.')
        } 
        // 401 may come from taken username/email, or by invalid secret code
        if(err.request.status === 401){
            return new Error(err.request.status, JSON.parse(err.request.response).error)
        }
        
        return new Error(err.request.status, 'Something went wrong in registration.')
    }
}

export default signinAdmin;