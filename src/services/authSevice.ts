import axiosInstance from "@/configs/axios";
import ForgotPassword from './../app/fogotpassword/page';

    
export const register = async (data: any) => {
    try {
        const response = await axiosInstance.post('/Auth/register', data);
        console.log('response111111', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const verifyEmail = async (data: any) => {
    try {
        const response = await axiosInstance.post('/Auth/verify-email', data);
        console.log('response', response.data);
        return response.data;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw error;
    }
}

export const login = async (data: any) => {
    try {
        const response = await axiosInstance.post('/Auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const sendEmail = async (data: any) => {
    try {
        const response = await axiosInstance.post('/Auth/otp-reset-password', data);
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
export const resetPassword = async (data: any) => {
    try {
        const response = await axiosInstance.post('/Auth/reset-password', data);
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}
