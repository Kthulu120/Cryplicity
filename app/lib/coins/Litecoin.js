/**
 * Bitcoin extension for Coin class
 */
import axios from 'axios';
import Coin from './Coin';
import Address from '../addresses/Address';
import Transaction from '../transaction/Transaction';
import API_KEYS from './../../utils/API_KEY';

const uuidv4 = require('uuid/v4');


const bitcoin = require('bitcoinjs-lib');

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
  checkBalance = (address) => axios.get(`https://api.blockcypher.com/v1/ltc/main/addrs/${address.publicKey}/balance`);

  /**
   * Get Recent Transactions for an Address
   * @param address the Address Object that we querying
   * @returns {array} of Transaction Objects for a given address
   */
  getRecentTransactions = (address) => {
    throw new Error('Cannot Get Litecoin');
  };

  /**
   * Generates a new Key Pair
   */
  generateNewAddress = () => axios.post(`https://api.blockcypher.com/v1/ltc/main/addrs?token=${API_KEYS.BlockCypher}`)

}
