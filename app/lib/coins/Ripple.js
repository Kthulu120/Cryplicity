/**
 * Bitcoin extension for Coin class
 */
import axios from 'axios';
import Coin from './Coin';
import Address from '../addresses/Address';
import Transaction from '../transaction/Transaction';
import { ErrorNotificationFactory, InfoNotificationFactory } from '../notification/NotificationFactory';

const uuidv4 = require('uuid/v4');


export default class Ripple extends Coin {
  constructor(coinslug = 'ripple', ticker = 'xrp', coinName = 'Ripple') {
    super(coinslug, ticker, coinName);
    this.baseConversion = 1000000;
  }
  static baseConversion = 1000000;
  /**
   * Checks the balance of a given Address using this coin
   * @param address the Address Object that we are querying
   */
  checkBalance = (address) => axios.get(`https://data.ripple.com/v2/accounts/${address.publicKey}/balances?currency=XRP&date=2015-01-01T00:00:00Z&limit=3`).then((response) => {
    response.data.balance = parseFloat(response.data.balances[0].value);
    response.data.total_received = response.data.balance;
    response.data.total_sent = 0;
    response.data.unconfirmed_balance = response.data.balance;
    response.data.final_balance = response.data.balance;
    response.data.n_tx = 0;
    response.data.unconfirmed_n_tx = 0;
    response.data.final_n_tx = 0;
    return response;
  });
  /**
   * Get Recent Transactions for an Address
   * @param address the Address Object that we querying
   * @returns {array} of Transaction Objects for a given address
   */
  getRecentTransactions = (address) => {
    // List of Transaction Objects
    InfoNotificationFactory("Can't Get Transactions", 'Getting Ripple transactions is not fully supported at this time');
    throw new Error('Cannot Get Ripple Transactions');
  };

  /**
   * Generates a new Key Pair
   */
  generateNewAddress = () => {
    ErrorNotificationFactory('Cannot Create Address', 'Cannot Create Addresses With Ripple Currently');
    throw new Error('Cannot Create Address With This Coin');
  }
}
