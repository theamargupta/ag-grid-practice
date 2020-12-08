import React, { useState } from 'react';

const Button = ({ api, data, title }) => {
  const deleteRow = () => {
    api.applyTransaction({ remove: [data] });
  };
  return <button onClick={deleteRow}>{title}</button>;
};

export default Button;
