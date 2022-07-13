import axios from 'axios'
import config from '../util/config'

import {Error, Success} from '../util/ResponseClasses'

const fetchMap = async (id) => {
    try{
        const url = `${config.API_ADDRESS}/api/maps/${id}`
        const response = await axios.get(url)
        return new Success(response.status, `You are viewing map as user`, response.data)
    } catch(err){
        if(err.request.status === 404){
            return new Error(err.request.status, `Map with id ${id} does not exist.`)
        } 
        console.log(err)
        return new Error(err.request.status, 'Something went wrong when finding map.')
    }
}

export default fetchMap;