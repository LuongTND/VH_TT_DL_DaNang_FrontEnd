"use client"

import type React from "react"

import { useState} from "react"
import { Button, Card, Form, Input, DatePicker, TimePicker, Typography, Space, Upload as AntUpload, notification, Steps } from "antd"
import { UploadOutlined, CalendarOutlined, CloseOutlined, ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, FileTextOutlined, PictureOutlined, CheckCircleOutlined } from "@ant-design/icons"
import Image from "next/image"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"

export default function EventCreationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    location: "",
    description: "",
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
const handleback = () => {
  router.push("/")
}

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDateChange = (field: "startDate" | "endDate", date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }))
  }

  // Hàm này được sử dụng thông qua AntUpload.Dragger

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
  }

  const handleSubmit = () => {
    form.validateFields()
      .then(() => {
        console.log("Form data:", formData)
        console.log(
          "Start DateTime:",
          formData.startDate && formData.startTime
            ? `${dayjs(formData.startDate).format("DD/MM/YYYY")} ${formData.startTime}`
            : null,
        )
        console.log(
          "End DateTime:",
          formData.endDate && formData.endTime ? `${dayjs(formData.endDate).format("DD/MM/YYYY")} ${formData.endTime}` : null,
        )
        console.log("Image file:", imageFile)
        // Xử lý submit form ở đây
        notification.success({
          message: 'Thành công',
          description: 'Sự kiện đã được tạo thành công!',
          placement: 'topRight'
        });
      })
      .catch(errorInfo => {
        notification.error({
          message: 'Lỗi',
          description: 'Vui lòng kiểm tra lại thông tin sự kiện',
          placement: 'topRight'
        });
        console.log('Validation failed:', errorInfo);
      });
  }

  const steps = [
    {
      title: 'Thông tin cơ bản',
      icon: <FileTextOutlined />
    },
    {
      title: 'Thời gian & Địa điểm',
      icon: <ClockCircleOutlined />
    },
    {
      title: 'Chi tiết & Hình ảnh',
      icon: <PictureOutlined />
    }
  ];

  const nextStep = () => {
    form.validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
      <Button onClick={handleback} icon={<ArrowLeftOutlined />} className="justify-start rounded-full"></Button>
        <div className="text-center  mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tạo Sự Kiện Mới</h1>
          <p className="text-gray-600">Điền thông tin chi tiết để tạo sự kiện của bạn</p>
        </div>
        <Card className="shadow-xl border-0">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg">
            <Typography.Title level={4} className="text-white flex items-center gap-2 m-0">
              <CalendarOutlined className="text-xl" />
              Thông Tin Sự Kiện
            </Typography.Title>
            <Typography.Text className="text-blue-100">Vui lòng điền đầy đủ thông tin để tạo sự kiện</Typography.Text>
          </div>
          
          <div className="p-6">
            <Steps
              current={currentStep}
              items={steps.map(item => ({
                title: item.title,
                icon: item.icon
              }))}
              className="mb-8"
            />
          </div>

          <div className="p-8 pt-0">
            <Form form={form} layout="vertical" className="space-y-6">
              {currentStep === 0 && (
                <>
                  {/* Tên sự kiện */}
                  <div className="space-y-2">
                    <Form.Item
                      label={<span className="text-lg font-semibold flex items-center gap-2">
                        <FileTextOutlined className="text-blue-600" /> Tên Sự Kiện <span className="text-red-500">*</span>
                      </span>}
                      name="name"
                      rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện' }]}
                    >
                      <Input
                        placeholder="Nhập tên sự kiện..."
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="h-12 text-lg"
                      />
                    </Form.Item>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  {/* Ngày và giờ bắt đầu */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Typography.Title level={5} className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-green-600" />
                        Thời Gian Bắt Đầu <span className="text-red-500">*</span>
                      </Typography.Title>

                      {/* Ngày bắt đầu */}
                      <div className="space-y-2">
                        <Form.Item 
                          label="Ngày bắt đầu" 
                          name="startDate"
                          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                        >
                          <DatePicker 
                            format="DD/MM/YYYY"
                            className="w-full h-12 text-lg"
                            placeholder="Chọn ngày bắt đầu"
                            onChange={(date) => date && handleDateChange("startDate", date.toDate())}
                          />
                        </Form.Item>
                      </div>

                      {/* Giờ bắt đầu */}
                      <div className="space-y-2">
                        <Form.Item 
                          label="Giờ bắt đầu" 
                          name="startTime"
                          rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
                        >
                          <TimePicker
                            format="HH:mm"
                            className="w-full h-12 text-lg"
                            placeholder="Chọn giờ bắt đầu"
                            onChange={(time, timeString) => handleInputChange("startTime", timeString as string)}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Typography.Title level={5} className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-red-600" />
                        Thời Gian Kết Thúc <span className="text-red-500">*</span>
                      </Typography.Title>

                      {/* Ngày kết thúc */}
                      <div className="space-y-2">
                        <Form.Item 
                          label="Ngày kết thúc" 
                          name="endDate"
                          rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                        >
                          <DatePicker 
                            format="DD/MM/YYYY"
                            className="w-full h-12 text-lg"
                            placeholder="Chọn ngày kết thúc"
                            onChange={(date) => date && handleDateChange("endDate", date.toDate())}
                          />
                        </Form.Item>
                      </div>

                      {/* Giờ kết thúc */}
                      <div className="space-y-2">
                        <Form.Item 
                          label="Giờ kết thúc" 
                          name="endTime"
                          rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc' }]}
                        >
                          <TimePicker
                            format="HH:mm"
                            className="w-full h-12 text-lg"
                            placeholder="Chọn giờ kết thúc"
                            onChange={(time, timeString) => handleInputChange("endTime", timeString as string)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  {/* Địa điểm */}
                  <div className="space-y-2 mt-6">
                    <Form.Item 
                      label={<span className="text-lg font-semibold flex items-center gap-2">
                        <EnvironmentOutlined className="text-purple-600" /> Địa Điểm <span className="text-red-500">*</span>
                      </span>}
                      name="location"
                      rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
                    >
                      <Input
                        placeholder="Nhập địa điểm tổ chức sự kiện..."
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="h-12 text-lg"
                      />
                    </Form.Item>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Mô tả */}
                  <div className="space-y-2">
                    <Form.Item
                      label={<span className="text-lg font-semibold flex items-center gap-2">
                        <FileTextOutlined className="text-orange-600" /> Mô Tả Sự Kiện
                      </span>}
                      name="description"
                    >
                      <Input.TextArea
                        placeholder="Mô tả chi tiết về sự kiện..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="text-lg"
                        rows={6}
                      />
                    </Form.Item>
                  </div>

                  {/* Upload hình ảnh */}
                  <div className="space-y-4">
                    <Form.Item
                      label={<span className="text-lg font-semibold flex items-center gap-2">
                        <PictureOutlined className="text-pink-600" /> Hình Ảnh Sự Kiện
                      </span>}
                      name="image"
                    >
                      {!imagePreview ? (
                        <AntUpload.Dragger
                          accept="image/*"
                          showUploadList={false}
                          beforeUpload={(file) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setImagePreview(e.target?.result as string);
                              setImageFile(file);
                            };
                            reader.readAsDataURL(file);
                            return false;
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            <UploadOutlined style={{ fontSize: '32px', color: '#999' }} />
                          </p>
                          <p className="ant-upload-text">Nhấp hoặc kéo thả để tải lên hình ảnh</p>
                          <p className="ant-upload-hint">PNG, JPG, GIF tối đa 10MB</p>
                        </AntUpload.Dragger>
                      ) : (
                        <div className="relative">
                          <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                            <Image
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-lg border-2 border-gray-200"
                            />
                          </div>
                          <Button
                            danger
                            onClick={removeImage}
                            style={{ position: 'absolute', top: '8px', right: '8px' }}
                            icon={<CloseOutlined />}
                          />
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </>
              )}

              {/* Nút điều hướng */}
              <Form.Item className="pt-6">
                <Space size="large">
                  {currentStep > 0 && (
                    <Button
                      size="large"
                      onClick={prevStep}
                      className="h-14 px-8"
                    >
                      Quay lại
                    </Button>
                  )}
                  
                  {currentStep < steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={nextStep}
                      size="large"
                      className="h-14 px-8"
                    >
                      Tiếp theo
                    </Button>
                  )}
                  
                  {currentStep === steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={handleSubmit}
                      size="large"
                      className="h-14 px-8"
                      icon={<CheckCircleOutlined />}
                    >
                      Hoàn tất
                    </Button>
                  )}
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  )
}