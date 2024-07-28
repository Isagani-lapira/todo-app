import { ApiClient } from './ApiClient';

export const getAllTask = async (username) => {
    try {
        const response = await ApiClient.get(`/task-list/${username}`);
        return response.data; 
    } catch (error) {
        console.log(error);
        return []; 
    }
};

export const addNewTask = async (todo) => {
    try {
        const response = await ApiClient.post('/add-task', todo);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const removeTask = async(id)=>{
    try{
        const response = await ApiClient.delete(`/task-list/remove/${id}`)
        return response;
    }catch(e){
        console.log(e)
    }
}

export const getTaskById = async(id)=>{
    try{
        const response = await ApiClient.get(`/task/${id}`)
        return response.data;
    }catch(error){
        return error
    }
}

export const updateTask = async(todo)=>{
    try{
        const response = await ApiClient.put('/update-task',todo);
        return response;
    }catch(error){
        return error;
    }
}





