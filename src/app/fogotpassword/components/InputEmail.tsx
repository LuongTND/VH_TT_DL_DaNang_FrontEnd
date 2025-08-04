'use client'

import { useState } from "react"
import { Input, Button, Card, Typography, Form } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { sendEmail } from "@/services/authSevice"
import {toast} from 'sonner'
const { Title, Text } = Typography;

export default function InputEmail({ 
    setIsModalOpen, 
    setUserEmail 
}: { 
    setIsModalOpen: (open: boolean) => void;
    setUserEmail: (email: string) => void;
}) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            setLoading(true);

            const emailValue = form.getFieldValue('email') || email;

            const response = await sendEmail({ email: emailValue });
            
            // Đảm bảo modal luôn mở khi API thành công
            if (response) {
                if (response.success) {
                    toast.success('Đã gửi OTP khôi phục mật khẩu thành công!');
                } else {
                    toast.error(response?.message || 'Không thể gửi email khôi phục. Vui lòng thử lại sau!');
                }
                
                // Luôn lưu email và mở modal khi có phản hồi từ API
                setUserEmail(emailValue);
                setIsModalOpen(true);
            }
        } catch (error) {
            if (error instanceof Error && 'errorFields' in error) return;
            toast.error('Không thể gửi email khôi phục. Vui lòng thử lại sau!');
            console.error('Error sending email:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md shadow-lg rounded-lg border-t-4 border-blue-600">
            <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <MailOutlined className="text-blue-600 text-3xl" />
                    </div>
                </div>
                <Title level={3} className="text-blue-700">Khôi phục mật khẩu</Title>
                <Text type="secondary" className="block mt-2">
                    Vui lòng nhập email đã đăng ký để nhận OTP khôi phục mật khẩu
                </Text>
            </div>

            <Form form={form} layout="vertical" requiredMark={false} className="mt-6">
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input
                        size="large"
                        prefix={<MailOutlined className="text-blue-500 mr-2" />}
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md py-2 border-gray-300 hover:border-blue-400 focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item className="mt-6">
                    <Button
                        type="primary"
                        size="large"
                        block
                        loading={loading}
                        onClick={handleSubmit}
                        className="h-12 rounded-md font-medium text-base shadow-md hover:shadow-lg transition-all"
                    >
                        Gửi yêu cầu khôi phục
                    </Button>
                </Form.Item>

                <div className="text-center mt-6 border-t border-gray-200 pt-4">
                    <Button 
                        type="link" 
                        href="/login"
                        className="flex items-center justify-center mx-auto text-blue-600 hover:text-blue-800"
                    >
                        <i className="fas fa-arrow-left mr-1"></i> Quay lại đăng nhập
                    </Button>
                </div>
            </Form>
        </Card>
    );
}
