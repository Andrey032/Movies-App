import { Pagination, ConfigProvider } from 'antd';

const PaginationComponent = ({ current, onChange }) => {
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
        total={50}
        style={{ justifyContent: 'center', marginBottom: 17 }}
      />
    </ConfigProvider>
  );
};

export default PaginationComponent;
