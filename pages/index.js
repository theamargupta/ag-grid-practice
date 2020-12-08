import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AgGridReact } from 'ag-grid-react';
import store from 'store';
// component
import dropDown from '../components/Dropdown';
import datePicker from '../components/DatePicker';
import deleteBtn from '../components/Button';
import AddRowBtn from '../components/AddRow';
// data
import {
  rowData,
  columnDefs,
  defaultColDef,
  nameColumnDefs,
} from '../utility/data';

const Home = () => {
  // Grid api
  const [gridApi, setGridApi] = useState(null);
  const [localRowData, setLocalRowData] = useState([]);
  const [localColumnDefs, setLocalColumnDefs] = useState([]);

  useEffect(() => {
    if (!store.get('rowData')) {
      store.set('rowData', rowData);
      store.set('columnDefs', columnDefs);
      setLocalRowData(store.get('rowData'));
      setLocalColumnDefs(store.get('columnDefs'));
    } else {
      setLocalRowData(store.get('rowData'));
      setLocalColumnDefs(store.get('columnDefs'));
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
            columnDefs={[...localColumnDefs, nameColumnDefs]}
            defaultColDef={defaultColDef}
            frameworkComponents={{
              dropDown: dropDown,
              datePicker: datePicker,
              deleteBtn: deleteBtn,
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
