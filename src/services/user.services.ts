import { LoginForm, SignUpForm } from "@/app/types/definitions";
import axios from "axios";

export async function userSignUp(user: SignUpForm) {
    try {
        const response = await axios.post('/api/user/signup', user);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        throw error;
    }
}

export async function userLogin(user: LoginForm) {
    try {
        const response = await axios.post('/api/user/login', user);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        throw error;
    }
}

export async function userLogout() {
    try {
        const response = await axios.get('/api/user/logout');
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        throw error;
    }
}

export const getSingleUserDetails = async () => {
    try {
        const response = await axios.get('/api/user/me');
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        throw error;
    }
};

export const userEmailVerification = async (token: string) => {
    try {
        const response = await axios.post('/api/user/verifyemail', { token });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        throw error;
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post('/api/user/forgotpassword', { email });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        throw error;
    }
};

export const resetPassword = async (newPassword: string, token: string) => {
    try {
        const response = await axios.post('/api/user/resetpassword', { newPassword, token });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        throw error;
    }
};

export async function getAllUsers() {
    try {
        const response = await axios.get(`/api/user/all`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        }
    }
}

export async function getUserWithId(userIds: string[]) {
    try {
        const response = await axios.get(`/api/user/getUser`, {
            params: { userIds: userIds.join(',') },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        }
    }
}
