import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
export default forwardRef((props, ref) => {
  const inputRef = useRef();
  const [datePickerValue, setDatePickerValue] = useState(props.value);
  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return inputRef.current.value;
      },
      afterGuiAttached: () => {
        inputRef.current.focus();
      },
    };
  });

  const onDatePickerChange = (event) => {
    setDatePickerValue(event.target.value);
  };
  return (
    <input
      type='date'
      ref={inputRef}
      value={datePickerValue}
      name='Date Of Birth'
      onChange={onDatePickerChange}
    />
  );
});
