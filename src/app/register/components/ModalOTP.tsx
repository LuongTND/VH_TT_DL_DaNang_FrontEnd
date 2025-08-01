'use client'

import { Modal, Input, Flex, Button } from 'antd';
import type { GetProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
type OTPProps = GetProps<typeof Input.OTP>;

interface ModalOTPProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: { otp: string }) => void;
}

export default function ModalOTP({ open, onCancel, onSubmit }: ModalOTPProps) {
    const [otpValue, setOtpValue] = useState('');

    const onChange: OTPProps['onChange'] = (text) => {
        console.log('onChange:', text);
        setOtpValue(text);
    };
    
    const handleSubmit = () => {
        onSubmit({ otp: otpValue });
    };

    return (
        <Modal 
            open={open} 
            onCancel={onCancel} 
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Xác nhận
                </Button>
            ]}
        >
            <div>
                <Title level={5}>Nhập mã OTP</Title>
                <p>Vui lòng nhập mã OTP đã được gửi đến email của bạn</p>
            </div>
            <Flex justify="center" align="center" gap={10} className="my-4">
                <Input.OTP
                    separator={(i) => <span style={{ color: i & 1 ? 'red' : 'blue' }}>—</span>}
                    onChange={onChange}
                />
            </Flex>
        </Modal>
    )
}