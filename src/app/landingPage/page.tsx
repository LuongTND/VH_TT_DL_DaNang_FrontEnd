'use client'
import React from 'react';
import { Layout, Button, theme } from 'antd';
import CarouselComponent from './Components/Caousel';
import MainContent from './Components/MainContent';
import { useRouter } from 'next/navigation';
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined, LoginOutlined } from '@ant-design/icons';
import Image from 'next/image';


const { Header, Content, Footer } = Layout;
const buttonStyle = {
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#000',
    color: '#fff',
  }

}

const LandingPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const navItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Trang Chủ',
      path: '/'
    },
    {
      key: '2',
      label: 'Giới Thiệu',
      icon: <InfoCircleOutlined />,
      path: '/about'    
    },
    {
      key: '3',
      label: 'Liên Hệ',
      icon: <ContactsOutlined />,
      path: '/contact'
    }
  ];

  return (
    <Layout className="w-full min-h-screen">
      <Header className="flex items-center px-6 gap-4">
        <div className='w-20 h-20'>
          <Image src="/images/logo.png" alt="logo" width={100} height={100} className='w-full h-full object-cover' />
        </div>
        <div className='flex-1 flex justify-between'>
        <div className="flex gap-4 items-center justify-between">
          {navItems.map((item) => (
            <Button 
              key={item.key}
              type={item.key === '1' ? 'primary' : 'default'}
              onClick={() => router.push(item.path)}
              className="font-medium"
              style={buttonStyle}
            >
              {item.icon}
              {item.label}
            </Button>
            
          ))}
          
          </div>
          <div>
          <Button type="primary" onClick={() => router.push('/login')} className='bg-blue-500 hover:bg-blue-600' style={buttonStyle}>
            <LoginOutlined />
            Đăng Nhập
          </Button>
          </div>
        </div>
      </Header>
      <Content className="px-12 py-6">
        <div
          className="p-6 rounded-lg flex flex-col"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <CarouselComponent />
          <MainContent />
        </div>
      </Content>
      <Footer className="text-center">
        Sở Văn Hóa Thể Thao và Du Lịch Đà Nẵng   
      </Footer>
    </Layout>
  );
};

export default LandingPage;