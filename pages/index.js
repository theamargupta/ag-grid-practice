import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AgGridReact } from 'ag-grid-react';
import store from 'store';
// component
import dropDown from '../components/Dropdown';
import datePicker from '../components/DatePicker';
import deleteBtn from '../components/Button';
import AddRowBtn from '../components/AddRow';
import asyncValidationEditor from '../components/AsyncEditor';
// data
import { rowData, columnDefs, defaultColDef } from '../utility/data';

const Home = () => {
  // Grid api
  const [gridApi, setGridApi] = useState(null);
  const [localRowData, setLocalRowData] = useState([]);

  useEffect(() => {
    if (!store.get('rowData')) {
      store.set('rowData', rowData);
      setLocalRowData(store.get('rowData'));
    } else {
      setLocalRowData(store.get('rowData'));
    }
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  const onRemoveSelected = () => {
    gridApi.applyTransaction({ remove: gridApi.getSelectedRows() });
  };
  return (
    <Layout title='Ag Grid'>
      <div>
        <AddRowBtn title={'Add Row'} atIndex={0} api={gridApi} />
        <AddRowBtn title={'Add Row at Index 3'} atIndex={3} api={gridApi} />
        <button onClick={onRemoveSelected}>Remove selected</button>

        <div className='ag-theme-alpine' style={{ height: 400, width: 1600 }}>
          <AgGridReact
            onGridReady={onGridReady}
            rowData={localRowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            frameworkComponents={{
              dropDown: dropDown,
              datePicker: datePicker,
              deleteBtn: deleteBtn,
              asyncValidationEditor: asyncValidationEditor,
            }}
            rowMultiSelectWithClick={true}
            rowSelection='multiple'
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
