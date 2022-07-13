import {useSubmit} from './useSubmit'
import useMessager from './useMessager'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const useRegister = (apiFunc) => {
    const [handleApiSubmit, loading, error, response] = useSubmit(apiFunc)
    const { setMessage } = useMessager()
    const { setUser } = useAuth()
    const navigate = useNavigate()
  
    useEffect(()=>{
      if(response && response.success === true) {
        setUser(response.data)
        setMessage(response)
        navigate('/home')
      } else if (error){
        setMessage(error)
      }
    }, [response, loading, error])

    return [handleApiSubmit, loading]
}

export default useRegister