import axios from 'axios';

/**
 * The Coin class serves as a base for specific Coin's to be implemented,
 */
export default class Coin {
  constructor(coinslug, ticker, coinName) {
    this.name = coinName;
    this.ticker = ticker;
    this.id = coinslug;
    this.valueUSD = 0;
    this.queryAPI = `https://api.coinmarketcap.com/v1/ticker/${coinslug}`;
    this.info = {};
  }

  getCoinMarketValue = () => {
    axios.get(this.queryAPI)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


}
