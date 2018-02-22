/* eslint-disable max-len */
/**
 * Nano extension for Coin class
 */
import axios from 'axios';
import Coin from './Coin';
import Transaction from '../transaction/Transaction';
import API_KEYS from './../../utils/API_KEY';
import { ErrorNotificationFactory } from '../notification/NotificationFactory';
const uuidv4 = require('uuid/v4');

export default class Nano extends Coin {
  constructor(coinslug = 'nano', ticker = 'NANO', coinName = 'Nano') {
    super(coinslug, ticker, coinName);
    this.baseConversion = 10 ** 30;
  }
  static baseConversion = 10 ** 30;
  /**
   * Checks the balance of a given Address using this coin
   * @param address the Address Object that we are querying
   */
  checkBalance = (address) => axios.get(`https://www.nanode.co/api/account?id=${address.publicKey}`).then(response => {
    console.log(response);
    response.data.balance = response.data.info.balance;
    response.data.total_received = response.data.info.balance;
    response.data.total_sent = response.data.info.balance;
    response.data.unconfirmed_balance = response.data.info.balance;
    response.data.final_balance = response.data.info.balance;
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
  getRecentTransactions = (address) => axios.get(`https://www.nanode.co/api/account?id=${address.publicKey}`).then((response) => {
    const listOfTrans = [];
    const thisAddress = response.data.info.account;
    const transactions = response.data.history;
    for (let i = 0; i < transactions.length; i++) {
      const thisTransaction = transactions[i];
      const toAddresses = [];
      const fromAddress = [];
      if (thisTransaction.type === 'receive') {
        toAddresses.push({ address: thisAddress, amt: (thisTransaction.amount / Nano.baseConversion) });
        fromAddress.push({ address: thisTransaction.account, amt: (thisTransaction.amount / Nano.baseConversion) });
      } else {
        toAddresses.push({ address: thisTransaction.account, amt: (thisTransaction.amount / Nano.baseConversion) });
        fromAddress.push({ address: thisAddress, amt: (thisTransaction.amount / Nano.baseConversion) });
      }
      listOfTrans.push(new Transaction(uuidv4(), toAddresses, fromAddress));
    }
    return listOfTrans;
  });

  /**
   * Generates a new Key Pair
   */
  generateNewAddress = () => {
    ErrorNotificationFactory('Cannot Create Address', 'Cannot Create Addresses With Nano Currently');
    throw new Error('Cannot Create Address With This Coin');
  }
}
