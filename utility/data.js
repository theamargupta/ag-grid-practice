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
    city: 'Chenai',
    country: 'india',
    gender: 'male',
    dateOfBirth: '2020-12-11',
  },
];

export const columnDefs = [
  { headerName: 'Name', field: 'name', checkboxSelection: true },
  { headerName: 'Email', field: 'email' },
  { headerName: 'City', field: 'city' },
];

export const defaultColDef = {
  sortable: true,
  editable: true,
  filter: true,
};

export const countryDefs = {
  headerName: 'Country',
  field: 'country',
  cellEditor: 'dropDown',
  cellEditorParams: {
    option: ['india', 'usa', 'uk'],
  },
};

export const dateOfBirthDefs = {
  headerName: 'Date of Birth',
  field: 'dateOfBirth',
  cellEditor: 'datePicker',
};

export const genderDefs = {
  headerName: 'Gender',
  field: 'gender',
  cellEditor: 'dropDown',
  cellEditorParams: {
    option: ['male', 'female'],
  },
};

export const deleteBtnDefs = {
  headerName: '',
  field: 'deleteBtn',
  cellRenderer: 'deleteBtn',
  cellRendererParams: {
    name: 'delete',
  },
  editable: false,
};
