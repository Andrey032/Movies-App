import { Flex, Input } from 'antd';
import { useEffect, useRef } from 'react';

const InputComponent = ({ onChangeValue }) => {
  const inputRef = useRef(null);

  const selectInput = () => {
    inputRef.current.focus();
  };
  useEffect(() => {
    selectInput();
  }, []);

  const handleChange = (evt) => {
    onChangeValue(evt.target.value);
  };

  return (
    <Flex className='input-container'>
      <Input
        ref={inputRef}
        placeholder='Type to search...'
        onChange={handleChange}
      />
    </Flex>
  );
};

export default InputComponent;
