'use client'
import React, { useEffect, useState } from 'react';
import { Layout, Button, Dropdown, Avatar, Drawer, Menu } from 'antd';
import MainContent from './Components/MainContent';
import { useRouter } from 'next/navigation';
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined, LoginOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Header, Content, Footer } = Layout;

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
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
      <Header className="flex items-center px-4 md:px-6 gap-2 md:gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex justify-between items-center">
          {!isMobile ? (
            <>
              <div className="flex gap-2 md:gap-4 items-center">
                {navItems.map((item) => (
                  <Button 
                    key={item.key}
                    type={item.key === '1' ? 'primary' : 'default'}
                    onClick={() => router.push(item.path)}
                    className={`font-medium bg-black text-white rounded-lg px-3 md:px-5 py-1.5 md:py-2.5 text-sm md:text-base hover:bg-black hover:text-white`}
                  >
                    {item.icon}
                    <span className="ml-1">{item.label}</span>
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
                    className="bg-black text-white rounded-lg px-3 md:px-5 py-1.5 md:py-2.5 text-sm md:text-base hover:bg-black hover:text-white"
                  >
                    <LoginOutlined />
                    <span className="ml-1">Đăng Nhập</span>
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 flex justify-end">
                <Button 
                  type="text" 
                  icon={<MenuOutlined style={{ fontSize: '24px' }} />} 
                  onClick={() => setDrawerVisible(true)}
                  className="text-black"
                />
              </div>
              <Drawer
                title="Menu"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={280}
              >
                <Menu mode="vertical" className="border-none">
                  {navItems.map((item) => (
                    <Menu.Item 
                      key={item.key} 
                      icon={item.icon}
                      onClick={() => {
                        router.push(item.path);
                        setDrawerVisible(false);
                      }}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                  <Menu.Divider />
                  {isLoggedIn ? (
                    <>
                      <Menu.Item key="profile" icon={<UserOutlined />}>
                        Trang cá nhân
                      </Menu.Item>
                      <Menu.Item 
                        key="logout" 
                        icon={<LoginOutlined />}
                        onClick={() => {
                          localStorage.removeItem('token');
                          setIsLoggedIn(false);
                          router.push('/login');
                          setDrawerVisible(false);
                        }}
                      >
                        Đăng xuất
                      </Menu.Item>
                    </>
                  ) : (
                    <Menu.Item 
                      key="login" 
                      icon={<LoginOutlined />}
                      onClick={() => {
                        router.push('/login');
                        setDrawerVisible(false);
                      }}
                    >
                      Đăng nhập
                    </Menu.Item>
                  )}
                </Menu>
              </Drawer>
            </>
          )}
        </div>
      </Header>
      <Content>
        <div className="rounded-lg flex flex-col bg-white">
          <MainContent />
        </div>
      </Content>
      <Footer className="text-center py-4 md:py-6 text-sm md:text-base">
        Sở Văn Hóa Thể Thao và Du Lịch Đà Nẵng   
      </Footer>
    </Layout>
  );
};

export default LandingPage;