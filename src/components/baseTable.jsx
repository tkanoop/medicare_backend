import React from 'react'
import DataTable from 'react-data-table-component';
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const customStyles = {
  headCells: {
    style: {
      backgroundColor: 'teal',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#222222',
      border: '1px solid white',
      
    },
  },
  
  cells: {
    style: {
      fontSize: '14px',
      color: '#222222',
     
      border: '1px solid #F2F2F2',
      textAlign: 'center',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#F2F2F2',
      color: '#222222',
    },
  },

};

function BaseTable(props) {
  return (
    <div className='w-full' style={{ border: '1px solid black', textAlign: 'center' }}>
      <DataTable
        pagination
        paginationComponentOptions={{
          rowsPerPageText: 'Rows per page:',
          rangeSeparatorText: 'of',
          noRowsPerPage: true,
        }}
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        selectableRowsComponentProps={selectProps}
        customStyles={customStyles}
        {...props}
      />
    </div>
  );
}

export default BaseTable;