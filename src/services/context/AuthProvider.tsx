import { Auth0Provider } from '@auth0/auth0-react';
import type { ReactNode } from 'react';

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Auth0Provider
      clientId={clientId}
      domain={domain}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}>
      {children}
    </Auth0Provider>
  );
};
