import React from 'react';
import { Spin } from 'antd';

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-4">
      <Spin size="large" />
    </div>
  );
};

export default LoadingComponent;
