import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import { useDebounce } from 'use-debounce';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--c-card)' }}>
      <SideBar />
      <Layout
        style={{
          borderStartStartRadius: '37px',
          borderEndStartRadius: '37px',
          backgroundColor: 'var(--c-background)',
        }}>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Content style={{ margin: '0 16px' }}>
          <Outlet context={{ debouncedSearch }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
