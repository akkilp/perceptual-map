import {useContext} from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationService';
const useAuth = () => {
    return useContext(AuthenticationContext);
};

export default useAuth