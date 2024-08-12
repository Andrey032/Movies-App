import { ConfigProvider, Progress } from 'antd';

const ProgressComponent = ({ voteAverage }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Progress: {
            remainingColor: '#E9D100',
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
