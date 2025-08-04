import axiosInstance from "@/configs/axios";


    
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
export const logout = () => {
    localStorage.removeItem('Token');
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    window.location.href = '/login';
}
