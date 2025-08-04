'use client'

import { useState } from "react";
import InputEmail from "./components/InputEmail";
import FogotPasswordForm from "./components/FogotPasswordForm";

export default function ForgotPassword() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    
    console.log('ForgotPassword page rendering with modal state:', isModalOpen);
    
    // Hàm wrapper để đảm bảo modal được mở
    const handleOpenModal = (open: boolean) => {
        console.log('Setting modal state to:', open);
        setIsModalOpen(open);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4">
            <div className="w-full max-w-md relative">
                <InputEmail setIsModalOpen={handleOpenModal} setUserEmail={setUserEmail} />
                <FogotPasswordForm 
                    isModalOpen={isModalOpen} 
                    setIsModalOpen={handleOpenModal} 
                    userEmail={userEmail} 
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-blue-100 opacity-70 z-0"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-blue-200 opacity-60 z-0"></div>
            </div>
        </div>
    );
}
