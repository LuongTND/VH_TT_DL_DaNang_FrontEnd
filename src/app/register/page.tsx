'use client'
import RegisterForm from "./components/RegisterForm"

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-4 relative overflow-hidden">
           <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: 'url(/images/3.jpg)' }}></div>
            <div className="z-10 w-full max-w-md transform transition-all duration-500 ">
                <RegisterForm />
            </div>
        </div>
    )
}