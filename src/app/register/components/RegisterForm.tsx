'use client'
import React from 'react';
import { Card, Input, Form, Button, Checkbox, Divider, Select, Radio } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterForm() {
    return (
        <Card  
        title={
            <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 relative mb-2 transform ">
                    <Image 
                        src="/images/logo.png" 
                        alt="Logo" 
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Đăng Ký</h1>
            </div>
        }
        className='w-full max-w-md bg-white/95  shadow-2xl rounded-xl border-t-4 border-blue-600 p-6 transition-all duration-300'
       
    >
        <Form layout='vertical' size="large">
            <Form.Item 
                label={<span className="font-semibold text-gray-700">Tên Người Dùng</span>} 
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
            >
                <Input 
                    placeholder="Nhập tên người dùng" 
                    prefix={<i className="fas fa-user text-blue-500" />} 
                    className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                />
            </Form.Item>
            <Form.Item 
                label={<span className="font-semibold text-gray-700">Email</span>} 
                name="email"
                rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                ]}
            >
                <Input 
                    placeholder="Nhập email" 
                    prefix={<i className="fas fa-envelope text-blue-500" />} 
                    className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                />
            </Form.Item>
            <Form.Item 
                label={<span className="font-semibold text-gray-700">Mật Khẩu</span>} 
                name="password"
                rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
                ]}
            >
                <Input.Password 
                    placeholder="Nhập mật khẩu" 
                    prefix={<i className="fas fa-lock text-blue-500" />} 
                    className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                />
            </Form.Item>
            <Form.Item 
                label={<span className="font-semibold text-gray-700">Xác Nhận Mật Khẩu</span>} 
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                        },
                    }),
                ]}
            >
                <Input.Password 
                    placeholder="Nhập lại mật khẩu" 
                    prefix={<i className="fas fa-lock text-blue-500" />} 
                    className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                />
            </Form.Item>
            <Form.Item 
                label={<span className="font-semibold text-gray-700">Bạn là doanh nghiệp hay cá nhân?</span>} 
                name="accountType"
                rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
            >
                <Radio.Group
                    className="rounded-lg flex flex-col gap-2 justify-center items-center"
                    options={[
                        { label: 'Doanh Nghiệp', value: 'doanh-nghiep' },
                        { label: 'Cá Nhân', value: 'ca-nhan' }
                    ]}
                />
            </Form.Item>
            <div className="flex justify-between items-center mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300">
                    Quên mật khẩu?
                </Link>
            </div>
            
            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-base transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Đăng Ký
                </Button>
            </Form.Item>
            
            <Divider plain className="text-gray-400">hoặc</Divider>
            
            <div className="text-center">
                <p className="text-gray-600 mb-2">Bạn đã có tài khoản?</p>
                <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                    Đăng nhập ngay
                </Link>
            </div>
        </Form>
    </Card>
    )
}