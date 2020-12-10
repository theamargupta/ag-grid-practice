import validator from 'validator';

export const rowData = [
  {
    name: 'Amar',
    email: 'Amar@test.com',
    city: 'Delhi',
    country: 'india',
    gender: 'male',
    dateOfBirth: '2020-12-08',
  },
  {
    name: 'Ashish',
    email: 'Amar@test.com',
    city: 'Mumbai',
    country: 'india',
    gender: 'male',
    dateOfBirth: '2020-12-09',
  },
  {
    name: 'Ankita',
    email: 'Amar@test.com',
    city: 'Kolkata',
    country: 'india',
    gender: 'female',
    dateOfBirth: '2020-12-10',
  },
  {
    name: 'Amrit',
    email: 'Amar@test.com',
    city: 'Chennai',
    country: 'india',
    gender: 'male',
    dateOfBirth: '2020-12-11',
  },
];
export const columnDefs = [
  { headerName: 'Name', field: 'name', checkboxSelection: true },
  {
    headerName: 'Email',
    field: 'email',
    cellClass: (props) =>
      validator.isEmail(props.value) ? 'validClass' : 'invalidClass',
    // cellStyle: (props) => {
    //   if (!validator.isEmail(props.value)) {
    //     return { color: 'white', backgroundColor: 'red' };
    //   } else {
    //     return null;
    //   }
    // },
  },
  {
    headerName: 'City',
    field: 'city',
    cellEditor: 'asyncValidationEditor',
    cellEditorParams: {
      condition: (value) => cityCountries.includes(value),
    },
  },
  {
    headerName: 'Country',
    field: 'country',
    cellEditor: 'dropDown',
    cellEditorParams: {
      option: ['india', 'usa', 'uk'],
    },
  },
  {
    headerName: 'Date of Birth',
    field: 'dateOfBirth',
    cellEditor: 'datePicker',
  },
  {
    headerName: 'Gender',
    field: 'gender',
    cellEditor: 'dropDown',
    cellEditorParams: {
      option: ['male', 'female'],
    },
  },
  {
    headerName: '',
    field: 'deleteBtn',
    cellRenderer: 'deleteBtn',
    cellRendererParams: {
      title: 'Delete',
    },
    editable: false,
  },
];

export const defaultColDef = {
  sortable: true,
  editable: true,
  filter: true,
};

export const emptyRowData = [
  {
    name: '',
    email: '',
    city: '',
    country: '',
    gender: '',
    dateOfBirth: '',
  },
];
export const cityCountries = ['Delhi', 'Chennai', 'Mumbai', 'Kolkata'];
