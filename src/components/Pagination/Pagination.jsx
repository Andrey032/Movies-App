import { Pagination, ConfigProvider } from 'antd';

const PaginationComponent = ({ current, onChange, lengthMovies, tab }) => {
  const { dataLength, rateDataLength } = lengthMovies;

  const disabledPaginationsLength = (tabs) => {
    if (
      (tabs === 'Search' && dataLength < 20) ||
      (tabs === 'Rated' && rateDataLength < 20)
    ) {
      return true;
    }
    return false;
  };

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
        disabled={disabledPaginationsLength(tab)}
        total={50}
        style={{ justifyContent: 'center', marginBottom: 17 }}
      />
    </ConfigProvider>
  );
};

export default PaginationComponent;
