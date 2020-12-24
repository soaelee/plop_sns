import {useState, useCallback} from 'react';

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback(e => {
    setValue(e.target.value)
  }, []);

  const resetValue = useCallback(() => {
    setValue('')
  }, []);

  return {value, handler, resetValue}
}

export default useInput