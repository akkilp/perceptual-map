import axios from 'axios'
import config from '../config'

const signinAdmin = async (credentials) => {
    try{
        const url = `${config.API_ADDRESS}/api/signin/admin`
        const response = await axios.post(url, credentials)
        return response
    } catch(err){
        console.log("Signing admin user failed", err)
        return err
    }
}

export default signinAdmin;