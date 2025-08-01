import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryProvider } from '@/services/context';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import './assets/styles/global.css';
import NotFound from './components/NotFound/NotFound.tsx';
import TodosPage from './pages/Todos/TodosPage.tsx';
import UsersPage from './pages/Users/UsersPage.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const domain = import.meta.env.VITE_AUTH0_DOMAIN;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      clientId={clientId}
      domain={domain}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}>
      <QueryProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </Auth0Provider>
  </StrictMode>
);
