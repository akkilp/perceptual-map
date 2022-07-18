import { useEffect, useState } from 'react'
function useFetch(callFunction) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined)
    const [data, setData] = useState(undefined)

    useEffect(() => {
        const callApi = async () => {
            setLoading(true)
            try {
                const response = await callFunction()
                setData(response)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        callApi()
    }, [])

    return [loading, error, data]
}

export default useFetch
