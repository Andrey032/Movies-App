import { sliceText } from '../../utils/constants';
import { Typography } from 'antd';

const Title = ({ title }) => {
  return (
    <Typography.Title
      level={3}
      style={{
        marginTop: 10,
        marginBottom: 7,
        fontSize: 20,
        lineHeight: 1.4,
      }}
    >
      {sliceText(title, 3)}
    </Typography.Title>
  );
};

export default Title;
