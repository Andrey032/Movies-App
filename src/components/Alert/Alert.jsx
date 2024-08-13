import { Alert, Flex } from 'antd';

const AlertComponent = ({ className, type, message, description }) => {
  return (
    <Flex justify='center'>
      <Alert
        message={message}
        description={description}
        type={type}
        showIcon
        closable
        className={className}
      />
    </Flex>
  );
};

export default AlertComponent;
