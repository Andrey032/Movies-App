import { Flex, Input } from 'antd';

const InputComponent = ({ onChangeValue }) => {
  const handleChange = (evt) => {
    onChangeValue(evt.target.value);
  };

  return (
    <Flex className='input-container'>
      <Input placeholder='Type to search...' onChange={handleChange} />
    </Flex>
  );
};

export default InputComponent;
