import { Tabs } from 'antd';

const TabsComponent = ({ toggleTab, lengthMovies }) => {
  const { rateDataLength } = lengthMovies;
  const itemsTabs = [
    {
      key: 'Search',
      label: 'Search',
    },
    {
      key: 'Rated',
      label: 'Rated',
      disabled: rateDataLength === 0 && true,
    },
  ];

  const onChangeTabs = (key) => {
    toggleTab(key);
  };

  return (
    <Tabs
      defaultActiveKey='1'
      items={itemsTabs}
      onChange={onChangeTabs}
      centered
      size='large'
      tabBarGutter={20}
      indicator={{ size: 64 }}
    />
  );
};

export default TabsComponent;
