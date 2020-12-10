// https://blog.ag-grid.com/user-input-validation-with-ag-grid/

function isValidEmail(email) {
  // taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const isGreaterThanFive = (x) => x > 5;
const isGreaterThanHundred = (x) => x > 100;
const numberParser = (params) => {
  return +params.newValue;
};

class CustomTooltip {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.classList.add('custom-tooltip');

    let { field, lastValidation, validationFailedMsg } = params.value;

    this.eGui.innerHTML = `
          <div class="validation-msg"> 
            FIELD-${field.toUpperCase()} - invalid value:  
            "<span class="invalid-value"> ${lastValidation} </span>", 
            ${validationFailedMsg}
          </div> 
      `;
  }
  getGui() {
    return this.eGui;
  }
}

const syncValidator = (newValue, validateFn, onSuccess, _onFail) => {
  if (validateFn(newValue)) {
    onSuccess();
  } else {
    _onFail();
  }
};

const _onSuccess = (params) => () => {
  let data = params.data;
  let field = params.colDef.field;

  data[field] = {
    ...data[field],
    isValidating: false,
    lastValidation: true,
    value: params.newValue,
  };
  params.api.applyTransaction({ update: [data] });
};

const _onFail = (params) => () => {
  let data = params.data;
  let field = params.colDef.field;

  data[field] = {
    ...data[field],
    isValidating: false,
    lastValidation: params.newValue,
  };
  params.api.applyTransaction({ update: [data] });
};

const syncValueSetter = (validateFn) => (params) => {
  syncValidator(
    params.newValue,
    validateFn,
    _onSuccess(params),
    _onFail(params)
  );
  return false;
};

function validationStatusRenderer(params) {
  let tick = `<i class="fa fa-check" aria-hidden="true"></i>`;
  let cross = `<i class="fa fa-times" aria-hidden="true"></i> `;
  let icon = params.value.lastValidation === true ? tick : cross;
  return icon;
}

export const gridOptions = {
  onGridReady: (params) => {
    params.columnApi.autoSizeAllColumns();
  },

  getRowNodeId: (data) => {
    return data.id;
  },

  columnDefs: [
    createColumnDef('a', isValidEmail),
    createColumnDef('b', isValidEmail),
    createColumnDef('c', isValidEmail),
  ],

  rowData: [
    {
      id: 'id-1',
      a: { value: 7, isValidating: false, lastValidation: true },
      b: { value: 150, isValidating: false, lastValidation: true },
      c: {
        value: 'example@ag-grid.com',
        isValidating: false,
        // lastValidation can be either true or the  user entered invalid value
        lastValidation: true,
      },
    },

    {
      id: 'id-2',
      a: { value: 23, isValidating: false, lastValidation: true },
      b: { value: 200, isValidating: false, lastValidation: true },
      c: {
        value: 'example@ag-grid.com',
        isValidating: false,
        lastValidation: true,
      },
    },
  ],
};

// setup the grid after the page has finished loading
// document.addEventListener('DOMContentLoaded', function () {
//   var gridDiv = document.querySelector('#myGrid');
//   new agGrid.Grid(gridDiv, gridOptions);
// });

function createValidationStatusColumn(
  field,
  validationFailedMsg = '',
  headerName = ''
) {
  return {
    colId: 'validation',
    valueGetter: (params) => params.data[field],
    headerName,
    cellRenderer: validationStatusRenderer,
    suppressMenu: true,
    minWidth: 10,
    tooltipComponent: CustomTooltip,
    tooltipValueGetter: (params) => {
      let isFieldValid = params.value.lastValidation === true;
      if (isFieldValid) return '';
      return {
        field,
        lastValidation: params.value.lastValidation,
        validationFailedMsg,
      };
    },
  };
}

function createColumnDef(field, validationFn, valueParser) {
  return {
    headerName: field,
    field,
    valueGetter: (params) => params.data[field].value,
    valueSetter: syncValueSetter(validationFn),
    editable: true,
    valueParser,
    cellStyle: (params) => {
      if (!isValidEmail(params.data[field].value)) {
        return { color: 'black', backgroundColor: 'red' };
      } else {
        return null;
      }
    },
  };
}
