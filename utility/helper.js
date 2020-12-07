export const onAddRow = (gridApi) => {
  gridApi.applyTransaction({
    add: [
      {
        name: '',
        email: '',
        city: '',
      },
    ],
    addIndex: 0,
  });
};

export const onAddRowAtIndex3 = (gridApi) => {
  gridApi.applyTransaction({
    add: [
      {
        name: '',
        email: '',
        city: '',
      },
    ],
    addIndex: 3,
  });
};

export const onRemoveSelected = (gridApi) => {
  gridApi.applyTransaction({ remove: gridApi.getSelectedRows() });
};
