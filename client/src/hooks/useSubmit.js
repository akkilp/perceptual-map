import { useState } from 'react'
import makeAuthHeader from '../util/makeAuthHeader'
import useAuth from './useAuth'

export const useSubmit = (submitFunction) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)
    const { user } = useAuth()

    const handleApiSubmit = async (...args) => {
        try {
            setResponse(null)
            setLoading(true)
            setError(null)
            const response = await submitFunction(
                ...args,
                user && user.token && makeAuthHeader(user.token)
            )
            setResponse(response)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return [handleApiSubmit, loading, error, response]
}
