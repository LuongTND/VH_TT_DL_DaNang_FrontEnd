import axiosInstance from "@/configs/axios";

interface RegisterData {
    email: string;
    password: string;
    nation: string;
    businessName: string;
    industry: string;
    contacts: {
        method: string;
        account: string;
    }[];
}
interface LoginData {
    email: string;
    password: string;
}
interface VerifyEmailData {
    email: string;
    otpCode: string;
}
interface SendEmailData {
    email: string;
}
interface ResetPasswordData {
    email: string;
    otpCode: string;
    newPassword: string;
}
export const register = async (data: RegisterData) => {
    try {
        const response = await axiosInstance.post('/Auth/register', data);
        console.log('response111111', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const verifyEmail = async (data: VerifyEmailData) => {
    try {
        const response = await axiosInstance.post('/Auth/verify-email', data);
        console.log('response', response.data);
        return response.data;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw error;
    }
}

export const login = async (data: LoginData) => {
    try {
        const response = await axiosInstance.post('/Auth/login', data);
        if(response.data.accessToken){
            localStorage.setItem('accessToken', response.data.accessToken);
            document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=${60*60*24*7}`;
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const sendEmail = async (data: SendEmailData) => {
    try {
        const response = await axiosInstance.post('/Auth/otp-reset-password', data);
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
export const resetPassword = async (data: ResetPasswordData) => {
    try {
        const response = await axiosInstance.post('/Auth/reset-password', data);
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}
export const logout = () => {
    localStorage.removeItem('Token');
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    window.location.href = '/login';
}
