import { Alert, Flex } from 'antd';
import PropTypes from 'prop-types';

const AlertComponent = ({
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

AlertComponent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  description: PropTypes.string,
};

export default AlertComponent;
