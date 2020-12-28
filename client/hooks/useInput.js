import { useState } from 'react';

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const handler = (e) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  return { value, handler, resetValue };
};

export default useInput;
