import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="error"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        // how to set active selected link (home page)
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
