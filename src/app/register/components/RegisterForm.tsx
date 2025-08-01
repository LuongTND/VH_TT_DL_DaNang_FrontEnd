'use client'
import React, { useState } from 'react';
import { Card, Input, Form, Button, Divider, Radio } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import ModalOTP from './ModalOTP';
import { register, verifyEmail } from '@/services/authSevice';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [email, setEmail] = useState('');

  interface RegisterFormValues {
    email: string;
    password: string;
    nation: string;
    businessName: string;
    industry: string;
    contactMethod: string;
    contactAccount: string;
  }

  const handleRegister = async (values: RegisterFormValues) => {
    const payload = {
      email: values.email,
      password: values.password,
      nation: values.nation,
      businessName: values.businessName,
      industry: values.industry,
      contacts: [
        {
          method: values.contactMethod,
          account: values.contactAccount,
        },
      ],
    };

    try {
      const response = await register(payload);
      console.log('Đăng ký response:', response);
      setEmail(values.email); // lưu để xác minh OTP
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  interface VerifyEmailValues {
    otp: string;
  }

  const handleVerifyEmail = async (values: VerifyEmailValues) => {
    try {
      console.log('Xác thực OTP với:', { email, otpCode: values.otp });
      const response = await verifyEmail({ email, otpCode: values.otp });
      console.log('Kết quả xác thực:', response);
      
      // Không cần kiểm tra response.success nữa
      setIsModalOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      title={
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 relative mb-2 transform">
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
      className="w-full max-w-md bg-white/95 shadow-2xl rounded-xl border-t-4 border-blue-600 p-6 transition-all duration-300"
    >
      <Form
        form={form}
        layout="vertical"
        size="large"
        onFinish={handleRegister}
        
      >
        <Form.Item
          label={<span className="font-semibold text-gray-700">Email</span>}
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
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
            { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            prefix={<i className="fas fa-lock text-blue-500" />}
            className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Quốc Gia</span>}
          name="nation"
          rules={[{ required: true, message: 'Vui lòng nhập quốc gia!' }]}
        >
          <Input
            placeholder="Nhập quốc gia"
            prefix={<i className="fas fa-globe text-blue-500" />}
            className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Tên Doanh Nghiệp</span>}
          name="businessName"
          rules={[{ required: true, message: 'Vui lòng nhập tên doanh nghiệp!' }]}
        >
          <Input
            placeholder="Nhập tên doanh nghiệp"
            prefix={<i className="fas fa-building text-blue-500" />}
            className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Ngành Nghề</span>}
          name="industry"
          rules={[{ required: true, message: 'Vui lòng nhập ngành nghề!' }]}
        >
          <Input
            placeholder="Nhập ngành nghề"
            prefix={<i className="fas fa-briefcase text-blue-500" />}
            className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Phương Thức Liên Hệ</span>}
          name="contactMethod"
          rules={[{ required: true, message: 'Vui lòng chọn phương thức liên hệ!' }]}
        >
          <Radio.Group
            className="rounded-lg flex flex-col gap-2"
            options={[
              { label: 'Email', value: 'Email' },
              { label: 'Số Điện Thoại', value: 'Phone' },
              { label: 'Zalo', value: 'Zalo' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Tài Khoản Liên Hệ</span>}
          name="contactAccount"
          rules={[{ required: true, message: 'Vui lòng nhập tài khoản liên hệ!' }]}
        >
          <Input
            placeholder="Nhập tài khoản liên hệ"
            prefix={<i className="fas fa-id-card text-blue-500" />}
            className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
          />
        </Form.Item>

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

      <ModalOTP
        open={isModalOpen}
        onCancel={handleCancel}
        onSubmit={handleVerifyEmail}
      />
    </Card>
  );
}
