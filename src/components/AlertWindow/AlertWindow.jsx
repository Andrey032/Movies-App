import { Alert, Flex } from 'antd';
import PropTypes from 'prop-types';

const AlertWindow = ({
  className = '',
  type = '',
  message = '',
  description = '',
}) => {
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

AlertWindow.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  description: PropTypes.string,
};

export default AlertWindow;
