'use client'
import React from 'react'
import LoginForm from './Components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: 'url(/images/3.jpg)' }}></div>
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
