'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ModalOTP from './ModalOTP';
import { register, verifyEmail } from '@/services/authSevice';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    nation: '',
    businessName: '',
    industry: '',
    contactMethod: 'Email',
    contactAccount: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});



  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formValues.email) {
      newErrors.email = 'Vui lòng nhập email!';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }
    
    if (!formValues.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu!';
    } else if (formValues.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự!';
    }
    
    if (!formValues.nation) newErrors.nation = 'Vui lòng nhập quốc gia!';
    if (!formValues.businessName) newErrors.businessName = 'Vui lòng nhập tên doanh nghiệp!';
    if (!formValues.industry) newErrors.industry = 'Vui lòng nhập ngành nghề!';
    if (!formValues.contactMethod) newErrors.contactMethod = 'Vui lòng chọn phương thức liên hệ!';
    if (!formValues.contactAccount) newErrors.contactAccount = 'Vui lòng nhập tài khoản liên hệ!';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormValues(prev => ({ ...prev, contactMethod: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    type RegisterPayload = {
      email: string;
      password: string;
      nation: string;
      businessName: string;
      industry: string;
      contacts: {
        method: string;
        account: string;
      }[];
    };
    
    const payload: RegisterPayload = {
      email: formValues.email,
      password: formValues.password,
      nation: formValues.nation,
      businessName: formValues.businessName,
      industry: formValues.industry,
      contacts: [
        {
          method: formValues.contactMethod,
          account: formValues.contactAccount,
        },
      ],
    };

    try {
      const response = await register(payload);
      console.log('Đăng ký response:', response);
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
      console.log('Xác thực OTP với:', { email: formValues.email, otpCode: values.otp });
      const response = await verifyEmail({ email: formValues.email, otpCode: values.otp });
      console.log('Kết quả xác thực:', response);
      
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
    <div className="w-full max-w-md bg-white/95 shadow-2xl rounded-xl border-t-4 border-blue-600 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-6">
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
        
        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-blue-500"></i>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Nhập email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-colors duration-300"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block font-semibold text-gray-700">Mật Khẩu</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-blue-500"></i>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-colors duration-300"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          {/* Nation */}
          <div className="space-y-2">
            <label htmlFor="nation" className="block font-semibold text-gray-700">Quốc Gia</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-globe text-blue-500"></i>
              </div>
              <input
                id="nation"
                name="nation"
                type="text"
                value={formValues.nation}
                onChange={handleInputChange}
                placeholder="Nhập quốc gia"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-colors duration-300"
              />
            </div>
            {errors.nation && <p className="text-red-500 text-sm">{errors.nation}</p>}
          </div>
          
          {/* Business Name */}
          <div className="space-y-2">
            <label htmlFor="businessName" className="block font-semibold text-gray-700">Tên Doanh Nghiệp</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-building text-blue-500"></i>
              </div>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formValues.businessName}
                onChange={handleInputChange}
                placeholder="Nhập tên doanh nghiệp"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-colors duration-300"
              />
            </div>
            {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
          </div>
          
          {/* Industry */}
          <div className="space-y-2">
            <label htmlFor="industry" className="block font-semibold text-gray-700">Ngành Nghề</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-briefcase text-blue-500"></i>
              </div>
              <input
                id="industry"
                name="industry"
                type="text"
                value={formValues.industry}
                onChange={handleInputChange}
                placeholder="Nhập ngành nghề"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-colors duration-300"
              />
            </div>
            {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
          </div>
          
          {/* Contact Method */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">Phương Thức Liên Hệ</label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <input
                  id="email-radio"
                  type="radio"
                  name="contactMethod"
                  value="Email"
                  checked={formValues.contactMethod === 'Email'}
                  onChange={() => handleRadioChange('Email')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="email-radio" className="ml-2 block text-sm text-gray-700">
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="phone-radio"
                  type="radio"
                  name="contactMethod"
                  value="Phone"
                  checked={formValues.contactMethod === 'Phone'}
                  onChange={() => handleRadioChange('Phone')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="phone-radio" className="ml-2 block text-sm text-gray-700">
                  Số Điện Thoại
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="zalo-radio"
                  type="radio"
                  name="contactMethod"
                  value="Zalo"
                  checked={formValues.contactMethod === 'Zalo'}
                  onChange={() => handleRadioChange('Zalo')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="zalo-radio" className="ml-2 block text-sm text-gray-700">
                  Zalo
                </label>
              </div>
            </div>
            {errors.contactMethod && <p className="text-red-500 text-sm">{errors.contactMethod}</p>}
          </div>
          
          {/* Contact Account */}
          <div className="space-y-2">
            <label htmlFor="contactAccount" className="block font-semibold text-gray-700">Tài Khoản Liên Hệ</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-id-card text-blue-500"></i>
              </div>
              <input
                id="contactAccount"
                name="contactAccount"
                type="text"
                value={formValues.contactAccount}
                onChange={handleInputChange}
                placeholder="Nhập tài khoản liên hệ"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-colors duration-300"
              />
            </div>
            {errors.contactAccount && <p className="text-red-500 text-sm">{errors.contactAccount}</p>}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Đăng Ký
          </button>
        </form>
        
        {/* Divider */}
        <div className="relative flex items-center justify-center mt-6 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">hoặc</span>
          </div>
        </div>
        
        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">Bạn đã có tài khoản?</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
            Đăng nhập ngay
          </Link>
        </div>
      </div>

      {/* OTP Modal */}
      <ModalOTP
        open={isModalOpen}
        onCancel={handleCancel}
        onSubmit={handleVerifyEmail}
      />
    </div>
  );
}
