'use client'
import React, { useEffect, useState } from 'react';
import { Layout, Button, Dropdown, Avatar } from 'antd';
import MainContent from './Components/MainContent';
import { useRouter } from 'next/navigation';
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Header, Content, Footer } = Layout;

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
        <div className="w-20 h-20">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex justify-between">
          <div className="flex gap-4 items-center justify-between">
            {navItems.map((item) => (
              <Button 
                key={item.key}
                type={item.key === '1' ? 'primary' : 'default'}
                onClick={() => router.push(item.path)}
                className={`font-medium bg-black text-white rounded-lg px-5 py-2.5 text-base hover:bg-black hover:text-white`}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>
          <div>
            {isLoggedIn ? (
              <Dropdown
                menu={{
                  items: [
                    { key: 'profile', label: 'Trang cá nhân' },
                    { key: 'logout', label: 'Đăng xuất', onClick: () => {
                      localStorage.removeItem('token');
                      setIsLoggedIn(false);
                      router.push('/login');
                    } }
                  ],
                }}
                placement="bottomRight"
                arrow
              >
                <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
              </Dropdown>
            ) : (
              <Button 
                type="primary" 
                onClick={() => router.push('/login')} 
                className="bg-black text-white rounded-lg px-5 py-2.5 text-base hover:bg-black hover:text-white"
              >
                <LoginOutlined />
                Đăng Nhập
              </Button>
            )}
          </div>
        </div>
      </Header>
      <Content>
        <div className="rounded-lg flex flex-col bg-white">
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