import { Rate } from 'antd';

const RateComponent = ({ voteAverage }) => {
  return (
    <Rate
      allowHalf
      value={voteAverage}
      Star
      count={10}
      style={{ fontSize: 16 }}
    />
  );
};

export default RateComponent;
