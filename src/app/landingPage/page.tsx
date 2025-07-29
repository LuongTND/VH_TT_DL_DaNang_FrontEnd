'use client'
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import CarouselComponent from './Components/Caousel';
import MainContent from './Components/MainContent';

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 3 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const LandingPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="w-full min-h-screen">
      <Header className="flex items-center">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          className="flex-1 min-w-0"
        />
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