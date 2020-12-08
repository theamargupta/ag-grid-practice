import React, { useState } from 'react';
import { emptyRowData } from '../../utility/data';

const Button = ({ api, title, atIndex }) => {
  const onAddRow = () => {
    api.applyTransaction({
      add: emptyRowData,
      addIndex: atIndex,
    });
  };
  return <button onClick={onAddRow}>{title}</button>;
};

export default Button;
