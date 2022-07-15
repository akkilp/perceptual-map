import axios from 'axios'
import config from '../util/config'

import {Error, Success} from '../util/ResponseClasses'

const fetchUserContent = async (id, options) => {
    try{
        const url = `${config.API_ADDRESS}/api/users/${id}`
        const response = await axios.get(url, options)
        return new Success(response.status, `Succesfully fetched user`, response.data)
    } catch(err){
        if(err.request.status === 404){
            return new Error(err.request.status, `User with id ${id} does not exist.`)
        } 
        return new Error(err.request.status, 'Something went wrong in fetching user. Refresh page to try again')
    }
}

export default fetchUserContent;

