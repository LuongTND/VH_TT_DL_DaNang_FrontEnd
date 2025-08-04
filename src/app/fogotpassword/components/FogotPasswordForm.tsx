'use client'

import { resetPassword } from "@/services/authSevice";
import { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import {toast} from 'sonner'
interface ResetPasswordForm {
    otpCode: string;
    newPassword: string;
    email: string;
}

export default function FogotPasswordForm({
    isModalOpen,
    setIsModalOpen,
    userEmail
}: {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    userEmail: string;
}) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();
    
    // Hàm chuyển hướng tới trang đăng nhập
    const navigateToLogin = useCallback(() => {
        try {
            router.push('/login');
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }, [router]);

    // Thiết lập giá trị email khi modal mở
    useEffect(() => {
        if (isModalOpen && userEmail) {
            form.setFieldsValue({ email: userEmail });
        }
    }, [isModalOpen, userEmail, form]);
    
    // State để theo dõi việc cần chuyển hướng sau khi đóng modal
    const [shouldRedirect, setShouldRedirect] = useState(false);
    
    // Sử dụng useEffect để theo dõi khi shouldRedirect thay đổi
    useEffect(() => {
        if (shouldRedirect) {
            // Đóng modal
            setIsModalOpen(false);
            
            // Chuyển hướng sau một khoảng thời gian
            const redirectTimer = setTimeout(() => {
                navigateToLogin();
                setShouldRedirect(false);
            }, 1000);
            
            return () => clearTimeout(redirectTimer);
        }
    }, [shouldRedirect, navigateToLogin, setIsModalOpen]);
    
    // Xử lý sự kiện sau khi modal đóng
    const handleAfterClose = () => {
    };

    const handleSubmit = async (values: ResetPasswordForm) => {
        try {
            setLoading(true);
            const response = await resetPassword(values);
    
            // Xử lý phản hồi từ API
            if (response) {
                
                // Kiểm tra nếu response là chuỗi "Đặt lại mật khẩu thành công"
                if (typeof response === 'string' && response.includes('thành công')) {
                    toast.success('Đặt lại mật khẩu thành công!');
                    form.resetFields();
                    
                    // Đánh dấu cần chuyển hướng
                    setShouldRedirect(true);
                } 
                // Kiểm tra các trường hợp thành công khác
                else if (response.success || response.status === 200) {
                    toast.success('Đặt lại mật khẩu thành công!');
                    form.resetFields();
                    setShouldRedirect(true);
                } else {
                    // Xử lý lỗi cụ thể
                    if (response.message && response.message.includes('OTP')) {
                        toast.error('Mã OTP không hợp lệ hoặc đã hết hạn');
                    } else if (typeof response === 'string' && response.includes('OTP')) {
                        toast.error('Mã OTP không hợp lệ hoặc đã hết hạn');
                    } else if (typeof response === 'string') {
                        toast.error(response);
                    } else {
                        toast.error(response.message || 'Đặt lại mật khẩu thất bại');
                    }
                }
            } else {
                toast.error('Không nhận được phản hồi từ máy chủ');
            }
        } catch (error) {
            console.error('Error in reset password:', error);
            toast.error('Đã có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };


    
    return (
        <Modal
            title={<div className="text-center text-xl font-bold text-blue-700">Đặt lại mật khẩu</div>}
            open={isModalOpen}
            onCancel={handleCancel}
            afterClose={handleAfterClose}
            maskClosable={false}
            keyboard={false}
            footer={null}
            destroyOnHidden={true}
            width={400}
            className="reset-password-modal"
            centered
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
                <Form.Item
                    name="email"
                    label={<span className="font-medium">Email <span className="text-red-500">*</span></span>}
                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                >
                    <Input 
                        type="email" 
                        placeholder="Nhập email" 
                        prefix={<i className="fas fa-envelope text-gray-400 mr-2"></i>}
                        className="py-2 rounded-md"
                        disabled={!!userEmail}
                    />
                </Form.Item>

                <Form.Item
                    name="otpCode"
                    label={<span className="font-medium">Mã OTP <span className="text-red-500">*</span></span>}
                    rules={[{ required: true, message: 'Vui lòng nhập mã OTP' }]}
                    extra={<span className="text-xs text-gray-500">Mã OTP đã được gửi đến email của bạn</span>}
                >
                    <Input 
                        placeholder="Nhập mã OTP" 
                        prefix={<i className="fas fa-key text-gray-400 mr-2"></i>}
                        className="py-2 rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label={<span className="font-medium">Mật khẩu mới <span className="text-red-500">*</span></span>}
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                    ]}
                >
                    <Input.Password 
                        placeholder="Nhập mật khẩu mới" 
                        prefix={<i className="fas fa-lock text-gray-400 mr-2"></i>}
                        className="py-2 rounded-md"
                    />
                </Form.Item>

                <Form.Item className="mt-6">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        className="h-10 font-medium rounded-md"
                    >
                        Đặt lại mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
