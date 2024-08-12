import { Rate } from 'antd';

const RateComponent = ({ item }) => {
  return (
    <Rate
      allowHalf
      value={item.vote_average}
      Star
      count={10}
      style={{ fontSize: 16 }}
    />
  );
};

export default RateComponent;
