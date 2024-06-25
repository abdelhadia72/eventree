import { AuthContext } from '../context/authContext.tsx';
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}