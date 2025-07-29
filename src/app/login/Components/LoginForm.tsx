'use client'
import React from 'react';
import { Card, Input, Form, Button, Checkbox, Divider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
    return (
        <Card 
            title={
                <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 relative mb-2">
                        <Image 
                            src="/images/logo.png" 
                            alt="Logo" 
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-blue-800">Đăng Nhập</h1>
                </div>
            }
            className='w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl rounded-lg border-t-4 border-blue-600'
            bordered={false}
        >
            <Form layout='vertical' size="large">
                <Form.Item 
                    label={<span className="font-medium">Tên Đăng Nhập</span>} 
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input placeholder="Nhập tên đăng nhập" prefix={<i className="fas fa-user text-gray-400" />} />
                </Form.Item>
                <Form.Item 
                    label={<span className="font-medium">Mật Khẩu</span>} 
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" prefix={<i className="fas fa-lock text-gray-400" />} />
                </Form.Item>
                
                <div className="flex justify-between items-center mb-4">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>
                    <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                        Quên mật khẩu?
                    </Link>
                </div>
                
                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="w-full h-10 bg-blue-600 hover:bg-blue-700"
                    >
                        Đăng Nhập
                    </Button>
                </Form.Item>
                
                <Divider plain className="text-gray-400">hoặc</Divider>
                
                <div className="text-center">
                    <p className="text-gray-600 mb-2">Bạn chưa có tài khoản?</p>
                    <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                        Đăng ký ngay
                    </Link>
                </div>
            </Form>
        </Card>
    )
}