import { Pagination, ConfigProvider } from 'antd';

const PaginationComponent = ({ current, onChange, total }) => {
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
        defaultCurrent={1}
        defaultPageSize={20}
        current={current}
        onChange={onChange}
        total={total}
        style={{ justifyContent: 'center', marginBottom: 17 }}
      />
    </ConfigProvider>
  );
};

export default PaginationComponent;
