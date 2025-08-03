import { Card, Spin } from 'antd';
import { LoginButton, LogoutButton } from '@/components';
import { useAuth0 } from '@auth0/auth0-react';

const AuthCard = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  return (
    <div className="flex justify-center items-center">
      <Card title={isAuthenticated ? 'Profile' : 'Welcome'} variant="borderless" style={{ width: 300 }}>
        {error && (
          <p className="text-danger text-center my-6">{error.message}</p>
        )}
        {!error && isLoading && (
          <div className="flex items-center justify-center my-6">
            <Spin size="small" />
          </div>
        )}
        {!error && !isLoading && isAuthenticated && (
          <div className="flex flex-col items-center justify-center gap-4 mb-6 text-center">
            <img
              src={user?.picture}
              alt={user?.name}
              className="rounded-full size-16 inline-block"
            />
            <p className='text-lg font-medium'>{user?.name}</p>
          </div>
        )}
        <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
      </Card>
    </div>
  );
};

export default AuthCard;
