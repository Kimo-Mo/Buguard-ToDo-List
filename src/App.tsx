import MainLayout from '@/components/layouts/MainLayout';
import { UIProvider } from '@/services/context';
import { App as AntdApp } from 'antd';

const App = () => {
  return (
    <AntdApp>
      <UIProvider>
        <MainLayout />
      </UIProvider>
    </AntdApp>
  );
};

export default App;
