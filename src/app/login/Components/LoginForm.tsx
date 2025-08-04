'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '@/services/authSevice';
import { useRouter } from 'next/navigation';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Alert, message } from 'antd';
export default function LoginForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    interface LoginFormValues {
        email: string;
        password: string;
    }

    const handleLogin = async (values: LoginFormValues) => {
        try {
            setLoading(true);
            setLoginError('');
            
            const response = await login(values);
            if (response.token) {
                localStorage.setItem('token', response.token);
                if (remember) {
                    localStorage.setItem('rememberUser', 'true');
                }
                message.success('Đăng nhập thành công!');
                router.push('/landingPage');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        // Kiểm tra nếu người dùng đã lưu thông tin đăng nhập trước đó
        const remembered = localStorage.getItem('rememberUser') === 'true';
        if (remembered) {
            setRemember(true);
        }
    }, []);


    return (
        <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-lg border-t-4 border-blue-600 overflow-hidden">
            <div className="p-6 sm:p-8">
                {/* Card Header */}
                <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-4 hover:scale-105 transition-transform duration-300">
                        <Image 
                            src="/images/logo.png" 
                            alt="Logo" 
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-blue-800">Đăng Nhập</h1>
                    <p className="text-gray-500 text-sm text-center">Đăng nhập để trải nghiệm dịch vụ của chúng tôi</p>
                </div>
                
                {loginError && (
                    <Alert 
                        message={loginError} 
                        type="error" 
                        showIcon 
                        closable 
                        className="mb-6" 
                        onClose={() => setLoginError('')}
                    />
                )}
                
                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    name="login_form"
                    onFinish={handleLogin}
                    className="space-y-4"
                    initialValues={{ remember: remember }}
                >
                    <Form.Item
                        name="email"
                        label="Tên Đăng Nhập"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="text-gray-400" />} 
                            placeholder="Nhập tên đăng nhập"
                            size="large"
                            className="rounded-md"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        label="Mật Khẩu"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Nhập mật khẩu"
                            size="large"
                            className="rounded-md"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    
                    <div className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox onChange={(e) => setRemember(e.target.checked)}>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>
                        <Link href="/fogotpassword" className="text-blue-600 hover:text-blue-800 text-sm">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-md"
                            size="large"
                            loading={loading}
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                        </Button>
                    </Form.Item>
                </Form>
                
                <div className="relative flex items-center justify-center mt-8 mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">hoặc</span>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="text-gray-600 text-sm mb-3">Bạn chưa có tài khoản?</p>
                    <Link href="/register" className="inline-block">
                        <Button type="default" size="large" className="min-w-[180px] rounded-md hover:text-blue-600 hover:border-blue-600">
                            Đăng ký ngay
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}