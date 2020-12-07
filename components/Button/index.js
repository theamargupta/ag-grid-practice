import React, { useState } from 'react';

function Button({ api, data, name }) {
  const deleteRow = () => {
    api.applyTransaction({ remove: [data] });
  };
  return <button onClick={deleteRow}>{name}</button>;
}

export default Button;
