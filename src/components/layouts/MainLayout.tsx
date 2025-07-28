import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import { useDebounce } from 'use-debounce';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

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
          <ErrorBoundary
            message="Something went wrong!"
            description="Please try again later.">
            <Outlet context={{ debouncedSearch }} />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
