'use client'

import { Modal, Input, Flex } from 'antd';
import type { GetProps } from 'antd';
import Title from 'antd/es/typography/Title';
type OTPProps = GetProps<typeof Input.OTP>;

export default function ModalOTP({ open, onCancel, onSubmit }: { open: boolean, onCancel: () => void, onSubmit: (values: any) => void }) {
    const onChange: OTPProps['onChange'] = (text) => {
        console.log('onChange:', text);
      };
    
      const onInput: OTPProps['onInput'] = (value) => {
        console.log('onInput:', value);
      };
    
      const sharedProps: OTPProps = {
        onChange,
        onInput,
      };
    return (
        <Modal open={open} onCancel={onCancel} onOk={onSubmit}>
            <div>
                <Title level={5}>Nhập mã OTP</Title>
            </div>
            <Flex justify="center" align="center" gap={10}>
                <Input.OTP
                    separator={(i) => <span style={{ color: i & 1 ? 'red' : 'blue' }}>—</span>}
                    {...sharedProps}
                />
              
            </Flex>
        </Modal>
    )
}