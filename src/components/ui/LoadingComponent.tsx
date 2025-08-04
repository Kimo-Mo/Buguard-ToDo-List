import React from 'react';
import { Spin } from 'antd';

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-4 h-[100vh]">
      <Spin size="large" />
    </div>
  );
};

export default LoadingComponent;
