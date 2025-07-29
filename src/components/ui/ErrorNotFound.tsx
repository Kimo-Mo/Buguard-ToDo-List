import { Result } from 'antd';

const ErrorNotFound = () => {
  return (
    <Result
      status="error"
      title="No Tasks Found"
      subTitle="Please try again with reloading the page."
    />
  );
};

export default ErrorNotFound;
