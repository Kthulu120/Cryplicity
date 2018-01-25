import React, { Component } from 'react';
import styles from './cryptoStockHome.css';
import { Line, LineChart, ReferenceLine } from 'recharts';
import axios from 'axios';
import { IndividualStockTab } from './IndividualStockTab';
import { BottomNavigation, BottomNavigationItem, Tabs } from 'material-ui';
import {CryptoStockInformation} from "./CryptoStockInformation";
import {CryptoStockChartNameContainer} from "./CryptoStockChartNameContainer";

const emptyStyle = {
  margin: 'auto',
  fontSize: '50px',
  color: '#C1C2CE',
  textTransform: 'uppercase'
};

export default class CryptoStockHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinStocks: [],
      selectedStock: -1,
      oneDayData: [],
      sevenDayData: [],
      oneMonthData: [],
      sixMonthData: [],
      oneYearData: [],
      selectedTab: 0,
      selectedChartData: []
    };
    setInterval(1800000, this.updateInformation());
  }
  select = (index) => {
    switch (index) {
      case 0:
        this.setState({ selectedChartData: this.state.oneDayData });
        break;
      case 1:
        this.setState({ selectedChartData: this.state.sevenDayData });
        break;
      case 2:
        this.setState({ selectedChartData: this.state.oneMonthData });
        break;
      case 3:
        this.setState({ selectedChartData: this.state.sixMonthData });
        break;
      case 4:
        this.setState({ selectedChartData: this.state.oneYearData });
        break;
    }
    this.setState({ selectedTab: index });
  };

  updateSelectedStock = (index) => {
    this.setState({ selectedStock: index });
    console.log(this.state.coinStocks[index]);
    axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=49&aggregate=30&e=CCCAGG`).then((response) => {
      this.setState({ oneDayData: response.data.Data });
      if (this.state.selectedTab === 0)
        this.setState({ selectedChartData: response.data.Data });
    });
    axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=29&aggregate=6&e=CCCAGG`).then((response) => {
      this.setState({ sevenDayData: response.data.Data });
      if (this.state.selectedTab === 1)
        this.setState({ selectedChartData: response.data.Data });
    });

    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=31&aggregate=1&e=CCCAGG`).then((response) => {
      this.setState({ oneMonthData: response.data.Data });
      if (this.state.selectedTab === 2)
        this.setState({ selectedChartData: response.data.Data });
    });
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=26&aggregate=7&e=CCCAGG`).then((response) => {
      this.setState({ sixMonthData: response.data.Data });
      if (this.state.selectedTab === 3)
        this.setState({ selectedChartData: response.data.Data });
    });
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=30&aggregate=12&e=CCCAGG`).then((response) => {
      this.setState({ oneYearData: response.data.Data });
      if (this.state.selectedTab === 4)
        this.setState({ selectedChartData: response.data.Data });
    });
  };

  updateInformation = () => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].chartData = [];
        const price = parseFloat(response.data[i].price_usd);
        const sevenDays = price - (price * (parseFloat(response.data[i].percent_change_7d) / 100.0));
        const oneDay = price - (price * (parseFloat(response.data[i].percent_change_24h) / 100.0));
        const oneHour = price - (price * (parseFloat(response.data[i].percent_change_1h) / 100.0));
        response.data[i].chartData.push({ price: sevenDays });
        response.data[i].chartData.push({ price: oneDay });
        response.data[i].chartData.push({ price: oneHour });
      }
      this.setState({ coinStocks: response.data });
    });
  };

  render() {
    return (
      <div className={styles.cryptoStockHomeContainer}>
        <div className={styles.cryptoList}>
          <div className={styles.cryptoListSearchBarCon}>
            <i className="material-icons" id="cryptoSearchHomeSearchIcon">search</i>
            <input placeholder="Search Cryptos" className={styles.cryptoStockSearchInput} />
          </div>
          <div className={styles.cryptosInnerListContainer}>
            {this.state.coinStocks.map((stock, curIndex) => (
              <IndividualStockTab
                stock={stock}
                indexSelected={this.state.selectedStock}
                thisIndex={curIndex}
                onClickContainer={this.updateSelectedStock}
                key={Math.random()}
              />
            ))}
          </div>
        </div>
        { this.state.coinStocks.length > 0 && this.state.selectedStock > -1 && this.state.oneDayData.length > 0  ?  <div className={styles.cryptoStockChart}>
          { this.state.coinStocks.length > 0 && this.state.selectedStock > -1 && this.state.oneDayData.length > 0  ? <CryptoStockChartNameContainer stock={this.state.coinStocks[this.state.selectedStock]} detailedStock={this.state.oneDayData[this.state.oneDayData.length - 1]} /> : <div />}
          <div className={styles.cryptoStockChartGraph}>
            <LineChart
              width={1000}
              height={400}
              data={this.state.selectedChartData}
              margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
              className={styles.mainChartGraphic}
            >
              <ReferenceLine y={this.state.selectedChartData.length > 0 ? this.state.selectedChartData[0].close : 0} strokeDasharray="2 1" stroke="#AEB9C2" />
              <Line type="monotone" dataKey="close" dot={false} stroke="#82ca9d" />
            </LineChart>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className={this.state.selectedTab === 0 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(0); }}>1 Days</div><div className={this.state.selectedTab === 1 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(1); }}>1 Week</div>
            <div className={this.state.selectedTab === 2 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(2); }}>1 Month</div><div className={this.state.selectedTab === 3 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(3); }}>6 Months</div>
            <div className={this.state.selectedTab === 4 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(4); }}>1 Year</div>
          </div>

          { this.state.coinStocks.length > 0 && this.state.selectedStock > -1 && this.state.oneDayData.length > 0  ? <CryptoStockInformation stock={this.state.coinStocks[this.state.selectedStock]} detailedStock={this.state.oneDayData[this.state.oneDayData.length - 1]} /> : <div />}
        </div> : <div style={emptyStyle}>SELECT A CRYPTO</div>}


      </div>
    );
  }

}
