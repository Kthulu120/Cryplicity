import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";

const rowStyle = {
  color: 'rgb(124, 122, 174)',
  backgroundColor: 'transparent',
};
const tableStyle = {
  color: 'rgb(124, 122, 174)',
  backgroundColor: 'transparent',
};
const tableWrapperStyle = {
  color: 'rgb(124, 122, 174)',
  backgroundColor: 'transparent',
  width: '400px',
  marginRight: 'auto',
};
const bodyStyle = {
  overflowY: 'auto',
  maxHeight: '200px'
};
const divStyle = {
  display: 'flex',
  marginRight: 'auto',
  flexDirection: 'column',
  textAlign: 'center',
  fontWeight: 900,
  color: 'rgb(124, 122, 174)'
}

export const AddressesTable = ({addresses}) => {

  return (
    <div style={divStyle}>
      <Table style={tableStyle} bodyStyle={bodyStyle} wrapperStyle={tableWrapperStyle} className="TransactionTable">
        <TableHeader>
          <TableRow style={rowStyle}>
            <TableHeaderColumn width='150'>Adresses</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="TransactionTableBody" style={bodyStyle} showRowHover>
          {addresses.map((addy) => {
            return (
            <TableRow style={rowStyle} >
              <TableRowColumn>{addy.publicKey} </TableRowColumn>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>

  );
}
