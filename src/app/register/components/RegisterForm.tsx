'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ModalOTP from './ModalOTP';
import { register, verifyEmail } from '@/services/authSevice';
import { useRouter } from 'next/navigation';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
export default function RegisterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  type FormValues = {
    email: string;
    password: string;
    nation: string;
    businessName: string;
    industry: string;
    contactMethods: string[];
    contactAccounts: Record<string, string>;
    secondaryEmail?: string;
  };

  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    nation: '',
    businessName: '',
    industry: '',
    contactMethods: ['Email'],
    contactAccounts: { Email: '' },
    secondaryEmail: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const getInputClass = (hasError: boolean) => {
    const base =
      'w-full pl-2 pr-3 py-2 text-sm text-black sm:text-base border rounded-lg transition-colors duration-300 focus:outline-none';
    const normal = ' border-gray-300 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
    const error = ' border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500';
    return base + (hasError ? error : normal);
  };

  const getContactPlaceholder = (method: string) => {
    switch (method) {
      case 'Email':
        return 'Nhập email liên hệ (vd: name@gmail.com)';
      case 'Phone':
        return 'Nhập số điện thoại WhatsApp (vd: +84xxxxxxxxx)';
      case 'Zalo':
        return 'Nhập số điện thoại/tài khoản Zalo';
      default:
        return 'Nhập tài khoản liên hệ';
    }
  };


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
    if (!formValues.contactMethods || formValues.contactMethods.length === 0) {
      newErrors.contactMethods = 'Vui lòng chọn ít nhất 1 phương thức liên hệ!';
    } else {
      for (const method of formValues.contactMethods) {
        const account = formValues.contactAccounts[method] || '';
        const key = `contact.${method}`;
        if (!account.trim()) {
          newErrors[key] = 'Vui lòng nhập tài khoản liên hệ!';
        } else if (method === 'Email' && !/\S+@\S+\.\S+/.test(account)) {
          newErrors[key] = 'Email liên hệ không hợp lệ!';
        } else if (method === 'Phone' && !/^\+?\d{8,15}$/.test(account.replace(/\s|-/g, ''))) {
          newErrors[key] = 'Số WhatsApp không hợp lệ!';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const toggleContactMethod = (method: string) => {
    setFormValues(prev => {
      const isSelected = prev.contactMethods.includes(method);
      const nextMethods = isSelected
        ? prev.contactMethods.filter(m => m !== method)
        : [...prev.contactMethods, method];
      const nextAccounts = { ...prev.contactAccounts };
      if (!isSelected && nextAccounts[method] === undefined) {
        nextAccounts[method] = '';
      }
      if (isSelected) {
        delete nextAccounts[method];
      }
      return { ...prev, contactMethods: nextMethods, contactAccounts: nextAccounts };
    });
  };

  const handleContactAccountChange = (method: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      contactAccounts: { ...prev.contactAccounts, [method]: value },
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
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
      contacts: formValues.contactMethods.map(method => ({
        method,
        account: formValues.contactAccounts[method] || '',
      })),
    };

    try {
      const response = await register(payload);
      console.log('Đăng ký response:', response);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  interface VerifyEmailValues {
    otp: string;
  }

  const handleVerifyEmail = async (values: VerifyEmailValues) => {
    try {
      const response = await verifyEmail({ email: formValues.email, otpCode: values.otp })
      console.log('Xác thực OTP với:', { email: formValues.email, otp: values.otp });
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
    <div className="w-full max-w-md h-[85vh] sm:h-[80vh] mx-auto bg-white/95 shadow-2xl rounded-xl border-t-4 border-blue-600 overflow-hidden flex flex-col">
      <div className=" sticky top-0 z-10 bg-white/95 backdrop-blur border-b">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
            <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Đăng Ký
          </h1>
        </div>
      </div>

      {/* Vùng nội dung cuộn */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
            {/* Email */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="email" className="block font-semibold text-gray-700 text-sm sm:text-base">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  className={getInputClass(!!errors.email)}
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={loading}
                />
              </div>
              {errors.email && <p id="email-error" className="text-red-500 text-xs sm:text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="email" className="block font-semibold text-gray-700 text-sm sm:text-base">
              Email phụ
              </label>
              <div className="relative">
                <input
                  id="secondaryEmail"
                  name="secondaryEmail"
                  type="secondaryEmail"
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  className={getInputClass(!!errors.secondaryEmail)}
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.secondaryEmail}
                  aria-describedby={errors.secondaryEmail ? 'secondaryEmail-error' : undefined}
                  disabled={loading}
                />
              </div>
              {errors.secondaryEmail && <p id="secondaryEmail-error" className="text-red-500 text-xs sm:text-sm">{errors.secondaryEmail}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="password" className="block font-semibold text-gray-700 text-sm sm:text-base">
                Mật Khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu"
                  className={getInputClass(!!errors.password)}
                  autoComplete="new-password"
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  disabled={loading}
                />
                <button type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeInvisibleOutlined className="text-base" /> : <EyeTwoTone className="text-base" />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="text-red-500 text-xs sm:text-sm">{errors.password}</p>}
              {!errors.password && formValues.password && (
                <p className="text-[11px] sm:text-xs text-gray-500">Mật khẩu tối thiểu 8 ký tự. Độ dài hiện tại: {formValues.password.length}</p>
              )}
            </div>

            {/* Nation */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="nation" className="block font-semibold text-gray-700 text-sm sm:text-base">
                Quốc Gia <span className="text-red-500">*</span>
              </label>
              <input
                id="nation"
                name="nation"
                type="text"
                value={formValues.nation}
                onChange={handleInputChange}
                placeholder="Nhập quốc gia"
                className={getInputClass(!!errors.nation)}
                autoComplete="country-name"
                required
                aria-invalid={!!errors.nation}
                aria-describedby={errors.nation ? 'nation-error' : undefined}
                disabled={loading}
              />
              {errors.nation && <p id="nation-error" className="text-red-500 text-xs sm:text-sm">{errors.nation}</p>}
            </div>

            {/* Business Name */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="businessName" className="block font-semibold text-gray-700 text-sm sm:text-base">
                Tên Doanh Nghiệp <span className="text-red-500">*</span>
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formValues.businessName}
                onChange={handleInputChange}
                placeholder="Nhập tên doanh nghiệp"
                className={getInputClass(!!errors.businessName)}
                autoComplete="organization"
                required
                aria-invalid={!!errors.businessName}
                aria-describedby={errors.businessName ? 'businessName-error' : undefined}
                disabled={loading}
              />
              {errors.businessName && <p id="businessName-error" className="text-red-500 text-xs sm:text-sm">{errors.businessName}</p>}
            </div>

            {/* Industry */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="industry" className="block font-semibold text-gray-700 text-sm sm:text-base">
                Ngành Nghề <span className="text-red-500">*</span>
              </label>
              <input
                id="industry"
                name="industry"
                type="text"
                value={formValues.industry}
                onChange={handleInputChange}
                placeholder="Nhập ngành nghề"
                className={getInputClass(!!errors.industry)}
                autoComplete="organization-title"
                required
                aria-invalid={!!errors.industry}
                aria-describedby={errors.industry ? 'industry-error' : undefined}
                disabled={loading}
              />
              {errors.industry && <p id="industry-error" className="text-red-500 text-xs sm:text-sm">{errors.industry}</p>}
            </div>

            {/* Contact Method */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block font-semibold text-gray-700 text-sm sm:text-base">
                Phương Thức Liên Hệ <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-row gap-4 flex-wrap">
                {/* Email */}
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="contactMethods" value="Email"
                         checked={formValues.contactMethods.includes('Email')}
                         onChange={() => toggleContactMethod('Email')}
                         className="h-4 w-4 text-blue-600"/>
                  <span className="text-xs sm:text-sm text-black">Email</span>
                </label>
                {/* WhatsApp */}
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="contactMethods" value="Phone"
                         checked={formValues.contactMethods.includes('Phone')}
                         onChange={() => toggleContactMethod('Phone')}
                         className="h-4 w-4 text-blue-600"/>
                  <span className="text-xs sm:text-sm text-black">WhatsApp</span>
                </label>
                {/* Zalo */}
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="contactMethods" value="Zalo"
                         checked={formValues.contactMethods.includes('Zalo')}
                         onChange={() => toggleContactMethod('Zalo')}
                         className="h-4 w-4 text-blue-600"/>
                  <span className="text-xs sm:text-sm text-black">Zalo</span>
                </label>
              </div>
              {('contactMethods' in errors) && (
                <p className="text-red-500 text-xs sm:text-sm">{errors['contactMethods']}</p>
              )}
            </div>

            {/* Contact Accounts - dynamic */}
            {formValues.contactMethods.length > 0 && (
              <div className="space-y-3">
                <label className="block font-semibold text-gray-700 text-sm sm:text-base">
                  Tài Khoản Liên Hệ <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {formValues.contactMethods.map(method => (
                    <div key={method} className="space-y-1">
                      <label htmlFor={`contact-${method}`} className="block text-xs sm:text-sm text-gray-600">
                        {method}
                      </label>
                      <input
                        id={`contact-${method}`}
                        name={`contact-${method}`}
                        type="text"
                        value={formValues.contactAccounts[method] || ''}
                        onChange={(e) => handleContactAccountChange(method, e.target.value)}
                        placeholder={getContactPlaceholder(method)}
                        className={getInputClass(!!errors[`contact.${method}`])}
                        autoComplete="username"
                        aria-invalid={!!errors[`contact.${method}`]}
                        aria-describedby={errors[`contact.${method}`] ? `contact-${method}-error` : undefined}
                        disabled={loading}
                      />
                      {errors[`contact.${method}`] && (
                        <p id={`contact-${method}-error`} className="text-red-500 text-xs sm:text-sm">
                          {errors[`contact.${method}`]}
                        </p>
                      )}
                      {!errors[`contact.${method}`] && (
                        <p className="text-[11px] sm:text-xs text-gray-500">
                          {method === 'Email' && 'Ví dụ: contact@gmail.com'}
                          {method === 'Phone' && 'Ví dụ: +84 912 345 678 (WhatsApp)'}
                          {method === 'Zalo' && 'Ví dụ: 0912 345 678 (Zalo)'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Đang đăng ký...
                </span>
              ) : 'Đăng Ký'}
            </button>
          </form>

          {/* Divider + Link */}
          <div className="relative flex items-center justify-center mt-4 sm:mt-6 mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-white text-gray-500">hoặc</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-xs sm:text-sm mb-2">Bạn đã có tài khoản?</p>
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm transition-colors duration-300">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <ModalOTP open={isModalOpen} onCancel={handleCancel} onSubmit={handleVerifyEmail}/>
    </div>
  );
}
