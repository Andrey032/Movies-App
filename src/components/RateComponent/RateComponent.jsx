import { Rate } from 'antd';

const RateComponent = ({ getIdAndRateCard, rating }) => {
  const handleChangeRate = (star) => {
    getIdAndRateCard(star);
  };

  return (
    <Rate
      allowHalf
      value={rating}
      Star
      count={10}
      style={{ fontSize: 16 }}
      onChange={handleChangeRate}
    />
  );
};

export default RateComponent;
