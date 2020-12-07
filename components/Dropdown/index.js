import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
export default forwardRef((props, ref) => {
  const inputRef = useRef();
  const [dropDownValue, setDropDownValue] = useState(props.value);
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

  const onDropDownChange = (event) => {
    setDropDownValue(event.target.value);
  };
  return (
    <select value={dropDownValue} ref={inputRef} onChange={onDropDownChange}>
      <option value=''> </option>
      {props.option.map((data, key) => (
        <option key={key} value={data}>
          {data}
        </option>
      ))}
    </select>
  );
});
