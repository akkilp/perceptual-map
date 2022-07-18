import { useSubmit } from './useSubmit'
import useMessager from './useMessager'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useRegister = (apiFunc) => {
    const [handleApiSubmit, loading, error, response] = useSubmit(apiFunc)
    const { displayMessage } = useMessager()
    const { setUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (response) {
            setUser(response.data)
            const message = `${
                response.data.admin ? 'Admin user' : 'User'
            } created succesfully!`
            displayMessage(message, 'success')
            navigate('/home')
        } else if (error) {
            displayMessage(error.message, 'error')
        }
    }, [response, loading, error])

    return [handleApiSubmit, loading]
}

export default useRegister
