import React, { useEffect } from 'react';
export const AuthenticationContext = React.createContext(null);

const AuthenticationService = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [authHeader, setAuth] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    
  

    // When site in launched, check if local storage remembers the user
    useEffect(()=>{
        const userInLocalStorage = window.localStorage.getItem('PerceptualMapUserCredentials') 
        if(userInLocalStorage){
            const u = JSON.parse(userInLocalStorage)
            setUser(u)
        }
        setLoading(false)
    }, [])

    // Every time user state is changed, update local storage & the header object that is passed to http request for backend
    useEffect(()=>{
        if(user && user.token){
            const authenticationHeader = {
                headers: {
                    Authorization: `bearer ${user.token}`
                }
            } 
            setAuth(authenticationHeader)
            window.localStorage.setItem(
                'PerceptualMapUserCredentials', JSON.stringify(user)
            ) 
        }
    }, [user])

    const logOut = () => {
        setUser(null)
        window.localStorage.removeItem('PerceptualMapUserCredentials')
    }

    return(
        <AuthenticationContext.Provider value={{loading, user, setUser, authHeader, logOut}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationService;




