import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
// component
import dropDown from '../components/Dropdown';
import datePicker from '../components/DatePicker';
import deleteBtn from '../components/Button';
// data
import {
  rowData,
  columnDefs,
  countryDefs,
  dateOfBirthDefs,
  defaultColDef,
  deleteBtnDefs,
  genderDefs,
} from '../utility/data';
// helper
import {
  onAddRow,
  onAddRowAtIndex3,
  onRemoveSelected,
} from '../utility/helper';

const Home = () => {
  // Grid api
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <Layout title='Ag Grid'>
      <div>
        <button onClick={() => onAddRow(gridApi)}>Add Row</button>
        <button onClick={() => onAddRowAtIndex3(gridApi)}>
          Add Row at Index 3
        </button>
        <button onClick={() => onRemoveSelected(gridApi)}>
          Remove selected
        </button>

        <div className='ag-theme-alpine' style={{ height: 400, width: 1600 }}>
          <AgGridReact
            onGridReady={onGridReady}
            rowData={rowData}
            columnDefs={[
              ...columnDefs,
              dateOfBirthDefs,
              countryDefs,
              genderDefs,
              deleteBtnDefs,
            ]}
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
