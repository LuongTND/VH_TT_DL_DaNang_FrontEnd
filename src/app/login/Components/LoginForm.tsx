'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '@/services/authSevice';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<{email?: string, password?: string}>({});

    interface LoginFormValues {
        email: string;
        password: string;
    }

    const validateForm = () => {
        const newErrors: {email?: string, password?: string} = {};
        if (!email) newErrors.email = 'Vui lòng nhập tên đăng nhập!';
        if (!password) newErrors.password = 'Vui lòng nhập mật khẩu!';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const values: LoginFormValues = { email, password };
        
        try {
            const response = await login(values);
            if (response.token) {
                localStorage.setItem('token', response.token);
                router.push('/landingPage');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-lg border-t-4 border-blue-600 overflow-hidden">
            <div className="p-4 sm:p-6">
                {/* Card Header */}
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-2">
                        <Image 
                            src="/images/logo.png" 
                            alt="Logo" 
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-blue-800">Đăng Nhập</h1>
                </div>
                
                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium text-gray-700">Tên Đăng Nhập</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-user text-gray-400"></i>
                            </div>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập tên đăng nhập"
                                className="w-full pl-10 pr-3 py-2 text-sm  text-black sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="password" className="block font-medium text-gray-700">Mật Khẩu</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                className="w-full pl-10 pr-3 py-2 text-sm  text-black sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-xs sm:text-sm text-gray-700">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <Link href="/fogotpassword" className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Đăng Nhập
                    </button>
                </form>
                
                <div className="relative flex items-center justify-center mt-4 sm:mt-6 mb-4 sm:mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                        <span className="px-2 bg-white text-gray-500">hoặc</span>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="text-gray-600 text-xs sm:text-sm mb-2">Bạn chưa có tài khoản?</p>
                    <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm">
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}