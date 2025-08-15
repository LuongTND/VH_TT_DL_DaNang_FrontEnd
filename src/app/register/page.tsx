'use client'
import RegisterForm from "./components/RegisterForm"

export default function RegisterPage() {
    return (
        <div className="min-h-screen overflow-hidden bg-[url('/images/3.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex items-center justify-center px-4">
        <RegisterForm />
      </div>
    </div>
    )
}