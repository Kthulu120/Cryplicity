import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import WalletCreationModal from './WalletCreationModal';
import { Paper, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import axios from 'axios';
import { CoinPriceChart } from './home/CoinPriceChart';

const style = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  maxHeight: '85%',
  overflowY: 'hidden',
  overflowX: 'hidden'
};
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchedCoins: []
    };
    this.checkMarkets();
    // Update Every 5 Minutes
   // setInterval(this.checkMarkets, 300000);
  }

  /**
   * Gets the price of the top 10 markets (soon to be your starred coins)
   */
  checkMarkets = () => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10').then((response) => { this.props.recordData(response.data); });
  };

  render() {
    return (
      <div>
        <Col sm={12} md={12}>

          <Row>
            <Col sm={12}>
              <Paper style={style} zDepth={2}>
                <Row>
                  <Col sm={12} className="hometable" >
                    <Table fixedHeader selectable={false} height={'300px'} >
                      <TableHeader>
                        <TableRow>
                          <TableHeaderColumn>Name</TableHeaderColumn>
                          <TableHeaderColumn>Price (USD)</TableHeaderColumn>
                          <TableHeaderColumn>Change(24hrs)</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {this.props.tableData.map(coin => (
                          <TableRow key={Math.random()}>
                            <TableRowColumn>{coin.name}</TableRowColumn>
                            <TableRowColumn>{`$${coin.price_usd}`}</TableRowColumn>
                            <TableRowColumn>{`${coin.percent_change_24h}%`}</TableRowColumn>
                          </TableRow>
                    ))}
                      </TableBody>
                    </Table>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Paper zDepth={3}>
              </Paper>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}
