import { Pagination, ConfigProvider } from 'antd';

const PaginationComponent = ({ current, onChange, lengthMovies }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            colorPrimary: '#ffffff',
            colorPrimaryHover: '#ffffff',
          },
        },
      }}
    >
      <Pagination
        current={current}
        onChange={onChange}
        disabled={!lengthMovies.dataLength && !lengthMovies.rateDataLength}
        total={50}
        style={{ justifyContent: 'center', marginBottom: 17 }}
      />
    </ConfigProvider>
  );
};

export default PaginationComponent;
