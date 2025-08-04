import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryProvider, UIProvider } from '@/services/context';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './assets/styles/global.css';
import { MainLayout, NotFound, ProtectedRoute } from '@/components';
import { AuthPage, TodosPage, UsersPage } from '@/pages';
import { AuthProvider } from '@/services/context';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TodosPage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryProvider>
      <UIProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </UIProvider>
    </QueryProvider>
  </AuthProvider>
);
