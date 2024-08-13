import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Flex } from 'antd';

const Spiner = () => {
  return (
    <Flex justify='center' align='center'>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />
        }
      />
    </Flex>
  );
};

export default Spiner;
