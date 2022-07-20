import { apiCall, apiCallWithPayload } from './apiCallBuilders'
import axios from 'axios'

export const createMap = (payload, options) =>
    apiCallWithPayload(axios.post, '/api/maps', payload, options, {
        success: `Map "${payload.title}" created succesfully!"`,
    })

export const fetchMap = (id) => apiCall(axios.get, `/api/maps/${id}`)

export const fetchUserContent = (id, options) =>
    apiCall(axios.get, `/api/users/${id}`, options)

export const login = (credentials) =>
    apiCallWithPayload(axios.post, '/api/login', credentials, {
        success: `You are logged in succesfully. Hello ${credentials.username}.`,
    })

export const signinAdmin = (credentials) =>
    apiCallWithPayload(
        axios.post,
        '/api/signin/admin',
        credentials,
        {},
        {
            success: 'Admin user succesfully created',
        }
    )

export const signinUser = (credentials) => {
    return apiCallWithPayload(
        axios.post,
        '/api/signin',
        credentials,
        {},
        {
            success: 'User succesfully created',
        }
    )
}

export const createDimension = (payload, mapId, options) => {
    return apiCallWithPayload(
        axios.post,
        `/api/maps/${mapId}/dimensions`,
        payload,
        options,
        {
            success: 'Dimension added succesfully.',
        }
    )
}

export const updateDimension = (payload, mapId, options) => {
    return apiCallWithPayload(
        axios.patch,
        `/api/maps/${mapId}/dimensions`,
        payload,
        options,
        {
            success: 'Dimension updated succesfully.',
        }
    )
}

export const deleteDimension = (dimId, mapId, options) => {
    return apiCall(axios.delete, `/api/maps/${mapId}/${dimId}`, options, {
        success: 'Dimension deleted succesfully.',
    })
}

export const createSubject = (payload, mapId, options) => {
    return apiCallWithPayload(
        axios.post,
        `/api/maps/${mapId}/subjects`,
        payload,
        options,
        {
            success: 'Subject created succesfully.',
        }
    )
}

export const updateSubject = (payload, mapId, options) => {
    return apiCallWithPayload(
        axios.patch,
        `/api/maps/${mapId}/subjects`,
        payload,
        options,
        {
            success: 'Subject updated succesfully.',
        }
    )
}

export const deleteSubject = (dimId, mapId, options) => {
    return apiCall(
        axios.delete,
        `/api/maps/${mapId}/subjects/${dimId}`,
        options,
        {
            success: 'Subjects deleted succesfully.',
        }
    )
}

export const sendAnswer = (payload, mapId, options) => {
    return apiCallWithPayload(
        axios.post,
        `/api/maps/${mapId}/answer`,
        payload,
        options
    )
}
