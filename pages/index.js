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
// Styled Components
import { Container, FirstContainerBox } from '../components/StyledComponents';

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
      <Container>
        <FirstContainerBox>
          <div>
            <h6>Soft Validation</h6>
            <p>
              Name length at{' '}
              <code>
                3 === "black", 4 === "green", 5 === "blue", 6 ==="red"
              </code>
            </p>
            <h6>Hard Validation</h6>
            <p>
              City name must include{' '}
              <code>['Delhi', 'Chennai', 'Mumbai', 'Kolkata']</code>
            </p>
          </div>
          <div>
            <AddRowBtn title={'Add Row'} atIndex={0} api={gridApi} />
            <AddRowBtn title={'Add Row at Index 3'} atIndex={3} api={gridApi} />
            <button onClick={onRemoveSelected}>Remove selected</button>
          </div>
        </FirstContainerBox>
        <div
          className='ag-theme-alpine'
          style={{ height: '40vh', width: '90vw' }}
        >
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
      </Container>
    </Layout>
  );
};

export default Home;
