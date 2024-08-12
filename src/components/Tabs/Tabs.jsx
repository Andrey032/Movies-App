import { itemsTabs } from '../../utils/constants';
import { Tabs } from 'antd';

const TabsComponent = () => {
  // const onChangeTabs = (key) => {
  //   console.log(key);
  // };
  return (
    <Tabs
      defaultActiveKey='1'
      items={itemsTabs}
      // onChange={onChangeTabs}
      centered
      size='large'
      tabBarGutter={20}
      indicator={{ size: 64 }}
    />
  );
};

export default TabsComponent;
