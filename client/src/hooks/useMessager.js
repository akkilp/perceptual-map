import {useContext} from 'react';
import { MessageContext } from '../contexts/MessageService';
const useMessager = () => {
    return useContext(MessageContext);
};

export default useMessager