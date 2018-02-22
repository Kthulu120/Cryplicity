import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Paper, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import IndividualWallet from './IndividualWallet';
import styles from './wallets.css';
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from 'recharts';
import axios from 'axios';
import { WalletChart } from './WalletChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

export default class WalletsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderAgain: true,
      coinvalues: [],
      holdingsArr: [],
      allocationArr: []
    };
    setInterval(300000, this.updateInformation());
  }
  updateHoldings = () => {
    const holdArr = [];
    this.props.wallets.forEach((wallet) => {
      let doesValueExist = holdArr.findIndex(holding => holding.coin === wallet.coinType);
      const doesUsdValExist = this.state.coinvalues.findIndex(value => value.coin === wallet.coinType);

      if (doesValueExist < 0) {
        const obj = { amount: 0, coin: wallet.coinType };
        holdArr.push(obj);
        doesValueExist = holdArr.length - 1;
      }
      if (doesUsdValExist > -1) { holdArr[doesValueExist].amount += (this.state.coinvalues[doesUsdValExist].value * wallet.coinAmt); }
    }
    );
    this.setState({ holdingsArr: holdArr });
  };

  /**
   * Updates Information
   */
  updateInformation = () => {
    this.props.wallets.forEach((wallet) => wallet.getBalancesForAddresses());
    this.props.wallets.forEach((wallet) => {
      const doesValueExist = this.state.coinvalues.findIndex(value => value.coin === wallet.coinType);
      if (doesValueExist < 0) {
        axios.get(`https://api.coinmarketcap.com/v1/ticker/${wallet.coinType}/`).then((response) => {
          this.setState({
            coinvalues: [...this.state.coinvalues, {
              coin: wallet.coinType,
              value: parseFloat(response.data[0].price_usd)
            }]
          });
          return response;
        }).then((response) => {
          wallet.getCoinAmount();
          this.updateHoldings();
        });
      }
    });
    this.props.wallets.forEach((wallet) => wallet.getBalancesForAddresses());
  };

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">

        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };
  render() {
    return (
      <div className={styles.cryptoWalletHomeContainer}>
        <div className={styles.walletList}>
          <div className={styles.cryptoListSearchBarCon}>
            <i className="material-icons" id="cryptoSearchHomeSearchIcon">search</i>
            <input placeholder="Search Wallets" className={styles.cryptoStockSearchInput} />
          </div>
          <div className={styles.cryptosInnerListContainer}>
            {this.props.wallets.map((wallet) => (
              <IndividualWallet
                wallet={wallet}
                coinValues={this.state.coinvalues}
                key={wallet.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.cryptoPortfolioContainer}>
          <div className={styles.portfolioPieContainer}>
            <div className={styles.holdingsGraph} >
              <h4> Portfolio By Coin </h4>
              <PieChart width={500} height={400}>
                <Label value="Portfolio By Coin" position="top" />
                <Legend />
                <Pie
                  data={this.state.holdingsArr}
                  dataKey={'amount'}
                  nameKey={'coin'}
                  labelLine={false}
                  label={this.renderCustomizedLabel}
                  outerRadius={180}
                  fill="#8884d8"
                  isAnimationActive={false}
                >
                  {
                    this.state.holdingsArr.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
              </PieChart>
            </div>
            <div className={styles.portfolioWalletGraph}>
              <h4> Portfolio By Wallet </h4>
              <WalletChart wallets={this.props.wallets} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}
