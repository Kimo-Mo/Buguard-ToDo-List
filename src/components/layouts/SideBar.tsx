import { Menu, Spin, type MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import {
  AppstoreOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  HistoryOutlined,
  PieChartOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginButton, LogoutButton } from '../ui';
import { useAuth0 } from '@auth0/auth0-react';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  backgroundColor: 'var(--c-card)',
};

const items: MenuItem[] = [
  getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
  getItem('Analytics', 'analytics', <PieChartOutlined />),
  getItem('History', 'history', <HistoryOutlined />),
  getItem('To-Do', '/', <FileTextOutlined />),
  getItem('Users', '/users', <UsergroupDeleteOutlined />),
  getItem('Report', 'report', <FileUnknownOutlined />),
  getItem('Settings', 'settings', <SettingOutlined />),
];

const SideBar = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  const { pathname } = useLocation();
  const [selectedPage, setSelectedPage] = useState('');
  useEffect(() => {
    if (pathname.includes('users')) {
      setSelectedPage('/users');
    } else {
      setSelectedPage('/');
    }
  }, [pathname]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    if (e.key.startsWith('/')) {
      navigate(e.key);
    } else {
      console.warn('Navigation not supported for this key:', e.key);
    }
  };

  // make the sider collapsed when the screen is less than 768px
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  // add resize event listener only once when component mounts
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Sider
      style={siderStyle}
      theme="light"
      collapsed={collapsed}
      onCollapse={() => handleResize()}>
      <h1
        className={`font-bold pt-3 mt-6 mb-4 ${
          collapsed ? 'text-lg px-2' : 'mx-1 ps-6 pe-3 text-3xl'
        }`}>
        TASK.<span className="text-primary">ai</span>
      </h1>
      <Menu
        style={{
          border: '0',
          padding: collapsed ? '0 4px' : '0 8px',
          backgroundColor: 'var(--c-card)',
        }}
        onSelect={({ key }) => setSelectedPage(key as string)}
        selectedKeys={[selectedPage]}
        mode="vertical"
        items={items}
        onClick={(e) => handleMenuClick(e)}
      />
      {error && <p className="text-danger text-center mt-4">{error.message}</p>}
      {!error && isLoading && (
        <div className="flex items-center justify-center my-4">
          <Spin size="small" />
        </div>
      )}
      {!error && !isLoading && isAuthenticated && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 px-1 md:px-3 mb-4 text-center">
          <img
            src={user?.picture}
            alt={user?.name}
            className="rounded-full size-6 inline-block"
          />
          <span>{user?.name}</span>
        </div>
      )}
      <div className="mx-0 md:mx-4 px-1 md:px-3">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </Sider>
  );
};

export default SideBar;
