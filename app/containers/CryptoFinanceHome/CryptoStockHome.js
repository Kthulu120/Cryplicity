import React, { Component } from 'react';
import styles from './cryptoStockHome.css';
import { Line, LineChart, ReferenceLine } from 'recharts';
import axios from 'axios';
import { IndividualStockTab } from './IndividualStockTab';
import { CryptoStockInformation } from './CryptoStockInformation';
import { CryptoStockChartNameContainer } from './CryptoStockChartNameContainer';
import { ErrorNotificationFactory } from '../../lib/notification/NotificationFactory';
import UtilFunctions from './../../utils/UtilFunctions';
import Wrapper from './Wrapper';
import InfoTabWrapper from './InfoTabWrapper';
import SearchBar from '../../components/SearchBar';

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
      filterText: '',
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
  }

  /**
   * Grab the top 100 coins in the filter
   */
  componentDidMount = () => {
    this.updateInformation();
  };

  /**
   * Sets which chart we're looking at, at the moment
   * @param index the number representing the chart to show
   */
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
      default:
        this.setState({ selectedChartData: this.state.oneDayData });
    }
    this.setState({ selectedTab: index });
  };

  /**
   * Grabs the historical pricing for the Crypto that is selected
   * @param stockTicker The Coin symbol
   */
  updateSelectedStock = (stockTicker) => {
    const index = UtilFunctions.findWithAttr(this.state.coinStocks, 'symbol', stockTicker);
    this.setState({ selectedStock: index });
    axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=49&aggregate=30&e=CCCAGG`).then((response) => {
      this.setState({ oneDayData: response.data.Data });
      if (this.state.selectedTab === 0) { this.setState({ selectedChartData: response.data.Data }); }
    }).catch((err) => ErrorNotificationFactory(err.message));
    axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=29&aggregate=6&e=CCCAGG`).then((response) => {
      this.setState({ sevenDayData: response.data.Data });
      if (this.state.selectedTab === 1) { this.setState({ selectedChartData: response.data.Data }); }
    }).catch((err) => ErrorNotificationFactory(err.message));

    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=31&aggregate=1&e=CCCAGG`).then((response) => {
      this.setState({ oneMonthData: response.data.Data });
      if (this.state.selectedTab === 2) { this.setState({ selectedChartData: response.data.Data }); }
    }).catch((err) => ErrorNotificationFactory(err.message));
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=26&aggregate=7&e=CCCAGG`).then((response) => {
      this.setState({ sixMonthData: response.data.Data });
      if (this.state.selectedTab === 3) { this.setState({ selectedChartData: response.data.Data }); }
    }).catch((err) => ErrorNotificationFactory(err.message));
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.coinStocks[index].symbol}&tsym=USD&limit=30&aggregate=12&e=CCCAGG`).then((response) => {
      this.setState({ oneYearData: response.data.Data });
      if (this.state.selectedTab === 4) { this.setState({ selectedChartData: response.data.Data }); }
    }).catch((err) => ErrorNotificationFactory(err.message));
  };

  /**
   * Update the stockTab information and computes rough graph with historical percentages
   */
  updateInformation = () => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then((response) => {
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
    }).catch((err) => ErrorNotificationFactory(err.message));
  };

  /**
   * Filters the list of coins by name and symbol using the lowercase text provided to it
   * @param filterText A lowercase string to apply to filter
   * @returns {Array} of coins whose either symbol or name contain the filter text
   */
  filterCryptos = (filterText) => {
    if (filterText.trim() === '') {
      return this.state.coinStocks;
    }
    const filterArr = [];
    this.state.coinStocks.forEach((element) => {
      if (element.symbol.toLowerCase().indexOf(filterText) !== -1 || element.name.toLowerCase().indexOf(filterText) !== -1) { filterArr.push(element); }
    });
    return filterArr;
  };

  render() {
    // TODO: Clean this up

    // We want to make sure some crypto is selected
    const cryptoSelected = this.state.coinStocks.length > 0 && this.state.selectedStock > -1 && this.state.oneDayData.length > 0;
    // The tabs we want to actually render
    const coinStockTabs = this.filterCryptos(this.state.filterText);
    return (
      <Wrapper>
        <InfoTabWrapper>
          <SearchBar onInputChange={text => this.setState({ filterText: text })} />
          <div className={styles.cryptosInnerListContainer}>
            {coinStockTabs.map((stock, curIndex) => (
              <IndividualStockTab
                stock={stock}
                indexSelected={this.state.selectedStock}
                thisIndex={curIndex}
                onClickContainer={this.updateSelectedStock}
                key={stock.name}
              />
            ))}
          </div>
        </InfoTabWrapper>
        { cryptoSelected ? <div className={styles.cryptoStockChart}>
          { cryptoSelected ? <CryptoStockChartNameContainer stock={this.state.coinStocks[this.state.selectedStock]} detailedStock={this.state.oneDayData[this.state.oneDayData.length - 1]} /> : <div />}
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
            <div className={this.state.selectedTab === 0 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(0); }}>1 Days</div>
            <div className={this.state.selectedTab === 1 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(1); }}>1 Week</div>
            <div className={this.state.selectedTab === 2 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(2); }}>1 Month</div>
            <div className={this.state.selectedTab === 3 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(3); }}>6 Months</div>
            <div className={this.state.selectedTab === 4 ? styles.activeTab : styles.regularTab} onClick={(e) => { this.select(4); }}>1 Year</div>
          </div>

          { cryptoSelected ? <CryptoStockInformation stock={this.state.coinStocks[this.state.selectedStock]} detailedStock={this.state.oneDayData[this.state.oneDayData.length - 1]} /> : <div />}
        </div> : <div style={emptyStyle}>SELECT A CRYPTO</div>}


      </Wrapper>
    );
  }

}
