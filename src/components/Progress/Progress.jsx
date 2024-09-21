import { ConfigProvider, Progress } from 'antd';

const ProgressComponent = ({ voteAverage }) => {
  const changeColor = (rate) => {
    let color;
    const rateAverage = Math.round(rate);
    if (rateAverage < 3) {
      color = '#E90000';
    } else if (rateAverage >= 3 && rateAverage < 5) {
      color = '#E97E00';
    } else if (rateAverage >= 5 && rateAverage < 7) {
      color = '#E9D100';
    } else if (rateAverage >= 7) {
      color = '#66E900';
    }
    return color;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Progress: {
            remainingColor: changeColor(voteAverage),
          },
        },
      }}
    >
      <Progress
        type='circle'
        format={() => voteAverage.toFixed(1)}
        size={30}
        strokeWidth={6}
      />
    </ConfigProvider>
  );
};

export default ProgressComponent;
