import { postData } from "@/app/types/definitions"
import axios from "axios"

export async function createTask(ceateData:postData){
    try {
        const response = await axios.post('/api/posts/create',{ceateData})
        return response.data
    } catch (error:any) {
        return error.response.data.error
    }
}

export async function deleteTask(id:string){
    try {
        const response = await axios.delete(`/api/posts/delete?id=${id}`)
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

export async function updateTask(editData:postData){
    try {
        const response = await axios.post(`/api/posts/edit`,{editData})
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

export async function getSingleTask(id:string){
    try {
        const response = await axios.get(`/api/posts/get_task?id=${id}`)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getMyTaskList(userId:string){
    try {
        const response = await axios.get(`/api/posts/get_user_todo?id=${userId}`)
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

export async function getCreatedTaskByMe(userId:string){
    try {
        const response = await axios.get(`/api/posts/get_created_tasks?id=${userId}`)
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

// Delete comments
export async function deleteComment(postId:string,commentId:string){
    try {
        const response = await axios.delete(`/api/posts/delete/comments?postId=${postId}&commentId=${commentId}`)
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}
