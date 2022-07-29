import { useEffect, useState } from 'react'
function useFetch(callFunction) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined)
    const [data, setData] = useState(undefined)

    useEffect(() => {
        const callApi = async () => {
            setLoading(true)
            console.log('starting')
            try {
                const response = await callFunction()
                setData(response)
                console.log('responsed')
            } catch (err) {
                setError(err)
                console.log('error')
            } finally {
                setLoading(false)
                console.log('loading set')
            }
        }
        callApi()
    }, [])

    return [loading, error, data]
}

export default useFetch
