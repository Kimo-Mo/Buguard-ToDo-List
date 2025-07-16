import MainLayout from '@/components/layouts/MainLayout';
import { UIProvider } from '@/services/context';

const App = () => {
  return (
    <UIProvider>
      <MainLayout />
    </UIProvider>
  );
};

export default App;
