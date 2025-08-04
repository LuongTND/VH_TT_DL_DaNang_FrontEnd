'use client'

import { useState } from 'react';

interface ModalOTPProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: { otp: string }) => void;
}

export default function ModalOTP({ open, onCancel, onSubmit }: ModalOTPProps) {
    const [otpValue, setOtpValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Chỉ cho phép số
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtpValue(value);
        }
    };
    
    const handleSubmit = () => {
        if (otpValue.length === 6) {
            onSubmit({ otp: otpValue });
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4 sm:p-6">
                {/* Modal Header */}
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Nhập mã OTP</h3>
                    <p className="text-gray-600 mt-1 text-xs sm:text-sm">Vui lòng nhập mã OTP đã được gửi đến email của bạn</p>
                </div>

                {/* OTP Input */}
                <div className="flex justify-center my-4 sm:my-6">
                    <div className="flex flex-col items-center w-full">
                        <input
                            type="text"
                            value={otpValue}
                            onChange={handleChange}
                            placeholder="Nhập mã OTP 6 số"
                            className="w-full px-3 sm:px-4 text-black py-2 sm:py-3 text-center text-base sm:text-lg font-medium tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={6}
                        />
                        <div className="flex justify-between w-full mt-2">
                            {Array(6).fill(0).map((_, index) => (
                                <div key={index} className="w-6 sm:w-8 h-1 bg-gray-300 rounded-full"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button
                        onClick={onCancel}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md text-gray-700 text-xs sm:text-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={otpValue.length !== 6}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-white text-xs sm:text-sm ${
                            otpValue.length === 6 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-blue-400 cursor-not-allowed'
                        } transition-colors duration-200`}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}