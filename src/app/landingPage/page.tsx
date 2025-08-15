'use client'
import React, { useEffect, useState } from 'react';
import { Layout, Button, Dropdown, Avatar, Drawer, Menu, Badge, Tooltip, theme } from 'antd';
import MainContent from './Components/MainContent';
import { useRouter } from 'next/navigation';
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined, LoginOutlined, UserOutlined, MenuOutlined, CalendarOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { logout } from '@/services/authSevice';
const { Header, Content, Footer } = Layout;

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notificationCount] = useState(3);
  const { token } = theme.useToken();
  const handelLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    router.push('/login');
  }
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
      icon: <HomeOutlined className="!text-white" />,
      label: 'Trang Chủ',
      path: '/'
    },
    {
      key: '2',
      label: 'Giới Thiệu',
      icon: <InfoCircleOutlined className="!text-white" />,
      path: '/about'    
    },
    {
      key: '3',
      label: 'Liên Hệ',
      icon: <ContactsOutlined className="!text-white" />,
      path: '/contact'
    },
    {
      key: '4',
      label: 'Tạo Workshop',
      icon: <CalendarOutlined className="!text-white" />,
      path: '/booking'
    }
  ];

  return (
    <Layout className="w-full min-h-screen">
      <Header className="flex items-center  px-4 md:px-6 gap-2 md:gap-4 sticky top-0 z-10 shadow-md !bg-[#22168d]">
        <div className="w-16 h-16 md:w-20 md:h-20 hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex justify-between items-center">
          {!isMobile ? (
            <>
              <div className="flex gap-2 md:gap-4 items-center">
                {navItems.map((item) => (
                  <Button 
                    key={item.key}
                    type="text"
                    shape="circle"
                    onClick={() => router.push(item.path)}
                    className={`font-medium bg-black text-white rounded-lg px-3 md:px-5 py-1.5 md:py-2.5 text-sm md:text-base hover:bg-black hover:text-white`}
                  >
                     {item.icon }
                    <span className="ml-1 text-white !border-none !shadow-none hover:!border-none">{item.label}</span>
                  </Button>
                ))}
              </div>
              <div>
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <Tooltip title="Thông báo">
                      <Badge count={notificationCount}  size="small">
                        <Button 
                          type="text" 
                          shape="circle" 
                          icon={<BellOutlined style={{ fontSize: '18px', color: 'white' }} />} 
                          className="flex items-center justify-center"
                        />
                      </Badge>
                    </Tooltip>
                    
                    <Dropdown
                      menu={{
                        items: [
                          { 
                            key: 'profile', 
                            label: 'Trang cá nhân',
                            icon: <UserOutlined />
                          },
                          { 
                            key: 'events', 
                            label: 'Sự kiện của tôi',
                            icon: <CalendarOutlined />
                          },
                          { 
                            type: 'divider' 
                          },
                          { 
                            key: 'logout', 
                            label: 'Đăng xuất', 
                            icon: <LogoutOutlined />,
                            danger: true,
                            onClick: () => {
                              localStorage.removeItem('token');
                              setIsLoggedIn(false);
                              router.push('/login');
                            } 
                          }
                        ],
                      }}
                      placement="bottomRight"
                      arrow
                    >
                      <Avatar 
                        size="large" 
                        icon={<UserOutlined />} 
                        className="cursor-pointer hover:opacity-80 transition-opacity duration-300" 
                      />
                    </Dropdown>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => router.push('/register')} 
                      className="rounded-lg px-3 md:px-5 py-1.5 md:py-2.5 text-sm md:text-base"
                    >
                      <span>Đăng ký</span>
                    </Button>
                    <Button 
                      type="primary" 
                      onClick={() => router.push('/login')} 
                      className="bg-blue-600 text-white rounded-lg px-3 md:px-5 py-1.5 md:py-2.5 text-sm md:text-base hover:bg-blue-700 hover:text-white"
                    >
                      <LoginOutlined />
                      <span className="ml-1">Đăng Nhập</span>
                    </Button>
                  </div>
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
                        onClick={handelLogout}
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
      <Footer className="text-center py-6 md:py-8 text-sm md:text-base bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
            <div>
              <h3 className="font-bold text-lg mb-4">Về chúng tôi</h3>
              <p className="text-gray-600">Sở Văn Hóa Thể Thao và Du Lịch Đà Nẵng</p>
              <p className="text-gray-600 mt-2">Địa chỉ: 102 Lê Lợi, Hải Châu, Đà Nẵng</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
              <p className="text-gray-600">Email: contact@svhttdl.danang.gov.vn</p>
              <p className="text-gray-600 mt-2">Điện thoại: (0236) 3830 246</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Theo dõi chúng tôi</h3>
              <div className="flex gap-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
                <a href="#" className="text-red-600 hover:text-red-800">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6">
            <p className="text-gray-600">© {new Date().getFullYear()} Sở Văn Hóa Thể Thao và Du Lịch Đà Nẵng. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default LandingPage;