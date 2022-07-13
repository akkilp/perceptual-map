import { useEffect,useState } from 'react'

function useFetch(callFunction) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined)
    const [response, setResponse] = useState(undefined)


    useEffect(()=> {
        const callApi = async() => {
            setLoading(true)
            const response = await callFunction
            setLoading(false)
            if (response.success === true) {
                setResponse(response)
            } else {
                setError(response)
            }
        }
        callApi()
    },[])

    return [loading, error, response]
}

export default useFetch;