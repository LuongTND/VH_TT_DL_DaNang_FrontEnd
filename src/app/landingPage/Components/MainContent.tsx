'use client'

import React from 'react'

const MainContent = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Sở Văn Hóa Thể Thao và Du Lịch Đà Nẵng</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-blue-100"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Văn Hóa</h3>
              <p className="text-gray-600">Thông tin về các hoạt động văn hóa tại Đà Nẵng</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-green-100"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Thể Thao</h3>
              <p className="text-gray-600">Thông tin về các hoạt động thể thao tại Đà Nẵng</p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-yellow-100"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Du Lịch</h3>
              <p className="text-gray-600">Thông tin về các điểm du lịch tại Đà Nẵng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent  
