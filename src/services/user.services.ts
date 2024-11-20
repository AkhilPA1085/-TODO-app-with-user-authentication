import { LoginForm, SignUpForm } from "@/app/types/definitions"
import axios from "axios"

export async function userSignUp(user: SignUpForm) {
    try {
        const response = await axios.post('/api/user/signup', user)
        return response;
    } catch (error: any) {
        return error.response.data
    }
}

export async function userLogin(user: LoginForm) {
    try {
        const response = await axios.post('/api/user/login', user)
        return response;
    } catch (error: any) {
        return error.response.data
    }
}

export async function userLogout() {
    try {
        const response = await axios.get('/api/user/logout')
        return response;
    } catch (error: any) {
        return error.response.data
    }
}

export const getSingleUserDetails = async() => {
    try {
        const response = await axios.get('/api/user/me')
        return response
    } catch (error:any) {
        return error.response.data
    }
}

export const userEmailVerification = async(token:string)=>{
    try {
        const response = await axios.post('/api/user/verifyemail',{token})
        return response
    } catch (error:any) {
        return error.response.data
    }
}

export const forgotPassword = async(email:string)=>{
    try {
        const response = await axios.post('/api/user/forgotpassword',{email})
        return response
    } catch (error:any) {
        return error.response.data
    }
}

export const resetPassword = async(newPassword:string,token:any)=>{
    try {
        const response = await axios.post('/api/user/resetpassword',{newPassword,token})
        return response
    } catch (error:any) {
        return error.response.data
    }
}


export async function getAllUsers(){
    try {
        const response = await axios.get(`/api/user/all`)
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

export async function getUserWithId(userIds:string[]){
    try {
        const response = await axios.get(`/api/user/getUser`,{
            params:{userIds:userIds.join(',')}
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}