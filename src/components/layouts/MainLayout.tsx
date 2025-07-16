import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout
      style={{ minHeight: '100vh', background: 'var(--c-card)' }}>
      <SideBar />
      <Layout
        style={{
          borderStartStartRadius: '37px',
          borderEndStartRadius: '37px',
          backgroundColor: 'var(--c-background)',
        }}>
        <Header />
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
