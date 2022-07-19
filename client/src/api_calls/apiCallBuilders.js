import config from '../util/config'

export const apiCall = async (
    method,
    endpoint,
    options = {},
    messages = {}
) => {
    try {
        const url = config.API_ADDRESS + endpoint
        const response = await method(url, options)
        return response
    } catch (error) {
        if (!error.response) {
            throw new Error(error.message)
        }
        if (error.response.status === 0) {
            throw new Error('Server could not be reached.')
        } else {
            throw new Error(error.response.data.error)
        }
    }
}

export const apiCallWithPayload = async (
    method,
    endpoint,
    data,
    options = {},
    messages = {}
) => {
    try {
        const url = config.API_ADDRESS + endpoint
        const response = await method(url, data, options)
        console.log(response)
        return response
    } catch (error) {
        if (!error.response) {
            throw new Error(error.message)
        }
        if (error.response.status === 0) {
            throw new Error(`${error.message}. Server did not respond.`)
        } else {
            throw new Error(error.response.data.error)
        }
    }
}
