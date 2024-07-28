import { ApiClient } from "./ApiClient";

export const executeAuthentication = async(token)=>{
    try{
        const response = await ApiClient.get('/auth')
        return response;
    }catch(error){
        return error;
    }
}