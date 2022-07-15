const makeAuthHeader = (token) => {
    const authenticationHeader = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    return authenticationHeader
}

export default makeAuthHeader;