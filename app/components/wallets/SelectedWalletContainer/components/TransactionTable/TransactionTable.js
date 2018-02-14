import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

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
  width: '100%',
  marginRight: 'auto',
};
const bodyStyle = {
  overflowY: 'auto',
  maxHeight: '250px'
};
const divStyle = {
  display: 'flex',
  marginRight: 'auto',
  flexDirection: 'column',
  textAlign: 'center',
  width: '100%',
  fontWeight: 900,
  color: 'rgb(124, 122, 174)',
  overflow: 'auto',
  height: '300px'
};

export default class TransactionTable extends React.Component {
  state = {
    transactions: []
  };

  loadAddressTransactions = () => {

  }

  render() {
    return (
      <div style={{
        display: 'flex',
        marginRight: 'auto',
        marginLeft:'auto',
        flexDirection: 'column',
        textAlign: 'center',
        width: '70%',
        fontWeight: 900,
        color: 'rgb(124, 122, 174)',
      }}>
        <h5>Transactions</h5>
      <div style={divStyle}>
        {console.log(this.props.addresses)}
        {this.props.addresses.map(superAddy => (
          <div>
            {console.log(superAddy)}
            {superAddy.transactions.map((transaction) => (
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px', borderBottom: 'rgba(128, 128, 128, 0.15) solid 1px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {transaction.addressFrom.map((addyFrom) => (
                    <p key={Math.random()}>
                      {addyFrom.address}
                    </p>
                  ))}</div>
                <i className="material-icons" style={{ marginRight: 'auto', marginLeft: 'auto' }}>arrow_froward</i>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                  {transaction.addressesTo.map((addy) => (
                    <div key={Math.random()} style={{ display: 'flex', flexDirection: 'row', borderBottom: 'rgba(128, 128, 128, 0.15) solid 1px', marginTop: '10px', marginBottom: '10px' }}>
                      <div style={{ marginRight: '10px' }}>{addy.amt}</div>
                      <div>{addy.address}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))
            }
          </div>
        ))}
      </div>
      </div>

    );
  }
}
