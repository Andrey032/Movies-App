import CardComponent from '../Card/Card';
import { List, Flex } from 'antd';

const ListComponent = ({ data }) => {
  return (
    <List
      grid={{
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 2,
        xxl: 2,
      }}
      dataSource={data}
      renderItem={(item) => (
        <Flex justify='center'>
          <CardComponent item={item} />
        </Flex>
      )}
    />
  );
};

export default ListComponent;
