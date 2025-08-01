'use client'
import Image from 'next/image'
import { Badge, Button, Input, Card } from 'antd'
import { SearchOutlined, ClockCircleOutlined, UserOutlined, StarOutlined } from '@ant-design/icons'

import React from 'react'

const MainContent = () => {
  return (
    <>
<section className="relative z-10 h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
  <Image src="/images/4.jpg" alt="Đà Nẵng sunset beach view" fill className="object-cover" priority />
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent">
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="text-white text-center max-w-2xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">
          Khám Phá Văn Hóa Đà Nẵng
          <span className="block text-yellow-300">Qua Các Workshop Độc Đáo</span>
        </h1>
        <p className="text-xs sm:text-sm mb-4 md:mb-8 text-blue-100">
          Tham gia các workshop văn hóa, thể thao và du lịch đặc sắc. Trải nghiệm truyền thống Việt Nam ngay tại thành phố biển xinh đẹp.
        </p>
      </div>
    </div>
  </div>

  {/* Search Box nằm giữa */}
  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 sm:bottom-8 md:bottom-10 z-20 bg-white/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 shadow-lg w-[95%] sm:w-[90%] max-w-4xl">
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
      <div className="w-full md:flex-1">
        <Input placeholder="Tìm workshop theo chủ đề..." className="h-10 md:h-12" />
      </div>
      <div className="w-full md:flex-1">
        <Input type="date" className="h-10 md:h-12" />
      </div>
      <Button className="w-full md:w-auto h-10 md:h-12 px-4 md:px-8 bg-yellow-500 hover:bg-yellow-600 text-blue-900 flex items-center justify-center">
        <SearchOutlined className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
        Tìm Kiếm
      </Button>
    </div>
  </div>
</section>
<section className="py-10 sm:py-12 md:py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1 sm:mb-2">500+</div>
              <div className="text-xs sm:text-sm md:text-base text-blue-200">Workshop đã tổ chức</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1 sm:mb-2">15,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-blue-200">Người tham gia</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1 sm:mb-2">4.8★</div>
              <div className="text-xs sm:text-sm md:text-base text-blue-200">Đánh giá trung bình</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm md:text-base text-blue-200">Chủ đề khác nhau</div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Workshops */}
      <section id="workshops" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2 sm:mb-3 md:mb-4">Workshop Nổi Bật</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Trải nghiệm những workshop đặc sắc nhất, từ văn hóa truyền thống đến thể thao hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
            {/* Workshop 1 */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-40 sm:h-44 md:h-48">
                <Image src="/images/1.jpg" alt="Workshop làm bánh tráng" fill className="object-cover" />
                <Badge className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4" color="yellow">Văn Hóa</Badge>
              </div>
              <Card.Meta 
                title={<div className="text-base sm:text-lg md:text-xl">Workshop Làm Bánh Tráng Truyền Thống</div>}
                className="p-3 sm:p-4"
              />
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined />3 giờ
                  </div>
                  <div className="flex items-center gap-1">
                    <UserOutlined />
                    12 người
                  </div>
                  <div className="flex items-center gap-1">
                    <StarOutlined className="text-yellow-400" />
                    4.9
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Học cách làm bánh tráng theo phương pháp truyền thống của người dân Đà Nẵng
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">350,000₫</div>
                  <Button className="text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-600 text-blue-900">Đặt Ngay</Button>
                </div>
              </div>
            </Card>

            {/* Workshop 2 */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-40 sm:h-44 md:h-48">
                <Image src="/images/2.webp" alt="Workshop múa Chăm" fill className="object-cover" />
                <Badge className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4" color="yellow">Nghệ Thuật</Badge>
              </div>
              <Card.Meta 
                title={<div className="text-base sm:text-lg md:text-xl">Workshop Múa Chăm Truyền Thống</div>}
                className="p-3 sm:p-4"
              />
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined />
                    2.5 giờ
                  </div>
                  <div className="flex items-center gap-1">
                    <UserOutlined />
                    15 người
                  </div>
                  <div className="flex items-center gap-1">
                    <StarOutlined className="text-yellow-400" />
                    4.8
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Khám phá vẻ đẹp của múa Chăm với trang phục truyền thống đầy màu sắc
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">280,000₫</div>
                  <Button className="text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-600 text-blue-900">Đặt Ngay</Button>
                </div>
              </div>
            </Card>

            {/* Workshop 3 */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
              <div className="relative h-40 sm:h-44 md:h-48">
                <Image src="/images/3.jpg" alt="Workshop bóng chuyền bãi biển" fill className="object-cover" />
                <Badge className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4" color="blue">Thể Thao</Badge>
              </div>
              <Card.Meta 
                title={<div className="text-base sm:text-lg md:text-xl">Workshop Bóng Chuyền Bãi Biển</div>}
                className="p-3 sm:p-4"
              />
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined />4 giờ
                  </div>
                  <div className="flex items-center gap-1">
                    <UserOutlined />
                    20 người
                  </div>
                  <div className="flex items-center gap-1">
                    <StarOutlined className="text-yellow-400" />
                    4.7
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Học kỹ thuật bóng chuyền bãi biển chuyên nghiệp tại bãi biển Mỹ Khê
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">420,000₫</div>
                  <Button className="text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-600 text-blue-900">Đặt Ngay</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button
              type="default"
              size="middle"
              className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white text-sm sm:text-base"
            >
              Xem Tất Cả Workshop
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainContent  
