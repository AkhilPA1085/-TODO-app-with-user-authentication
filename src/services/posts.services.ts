import { ListType, postData } from "@/app/types/definitions"
import axios from "axios"

export async function createPost({todo,userId,end_date,status,assignedTo}:postData){
    try {
        const response = await axios.post('/api/posts/create',{todo,userId,end_date,status,assignedTo})
        return response.data
    } catch (error:any) {
        return error.response.data.error
    }
}

export async function getMyTodoList(userId:string){
    try {
        const response = await axios.get(`/api/posts/get_user_todo?id=${userId}`)
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

export async function deleteTodo(id:string){
    try {
        const response = await axios.delete(`/api/posts/delete?id=${id}`)
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

export async function updateTodo(editData:postData){
    try {
        const response = await axios.post(`/api/posts/edit`,{editData})
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}
