/**
 * Bitcoin extension for Coin class
 */
import axios from 'axios';
import Coin from './Coin';
import Transaction from '../transaction/Transaction';
import API_KEYS from './../../utils/API_KEY';

const uuidv4 = require('uuid/v4');


export default class Bitcoin extends Coin {
  constructor(coinslug = 'bitcoin', ticker = 'btc', coinName = 'bitcoin') {
    super(coinslug, ticker, coinName);
    this.baseConversion = 100000000;
  }
  static baseConversion = 100000000;
  /**
   * Checks the balance of a given Address using this coin
   * @param address the Address Object that we are querying
   */
  checkBalance = (address) => axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address.publicKey}/balance`);

  /**
   * Get Recent Transactions for an Address
   * @param address the Address Object that we querying
   * @returns {array} of Transaction Objects for a given address
   */
  getRecentTransactions = (address) => axios.get(`https://blockchain.info/rawaddr/${address.publicKey}`).then((response) => {
          // List of Transaction Objects
    const listOfTrans = [];
    for (let i = 0; i < response.data.txs.length; i++) {
      const toAddresses = [];
      const fromAddress = [];
      response.data.txs[i].inputs.forEach((addy) => {
        fromAddress.push({ address: addy.prev_out.addr, amt: (addy.prev_out.value / this.baseConversion) });
      });
      response.data.txs[i].out.forEach((addy) => {
        toAddresses.push({ address: addy.addr, amt: (addy.value / this.baseConversion) });
      });
      listOfTrans.push(new Transaction(uuidv4(), toAddresses, fromAddress));
    }
    return listOfTrans;
  });

  /**
   * Generates a new Key Pair
   */
  generateNewAddress = () => axios.post(`https://api.blockcypher.com/v1/btc/main/addrs?token=${API_KEYS.BlockCypher}`)

}
