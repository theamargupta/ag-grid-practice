import React, { useState } from 'react';

function Button(props) {
  const deleteRow = () => {
    let data = props.data;
    props.api.applyTransaction({ remove: [data] });
  };
  return <button onClick={deleteRow}>{props.name}</button>;
}

export default Button;
