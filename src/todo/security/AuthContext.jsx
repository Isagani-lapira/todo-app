import { createContext, useContext, useState } from "react";
import {executeAuthentication} from './../api/AuthApi'
import { ApiClient } from "../api/ApiClient";

const AuthContext = createContext();
export const useAuth = ()=>useContext(AuthContext);

export default function AuthProvider({children}){
    const [username,setUsername] = useState('');
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    async function authenticate(username, password){
        const token = 'Basic '+window.btoa(username+":"+password);
        const response = await executeAuthentication(token)
        if(response.status == 200){
            setIsAuthenticated(true);
            setUsername(username)
            setToken(token)

            // to be applies to all headers authorization that uses this API
            ApiClient.interceptors.request.use(
                (config)=>{
                    config.headers.Authorization = token;
                    return config;
                }
            )
            return true;
        }

        return false;
    }
    return(
        <AuthContext.Provider value={{username,isAuthenticated,authenticate,token}}>
            {children}
        </AuthContext.Provider>
    )
}