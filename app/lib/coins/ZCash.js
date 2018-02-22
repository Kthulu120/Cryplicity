/**
 * ZCash extension for Coin class
 */
import axios from 'axios';
import Coin from './Coin';
import Address from '../addresses/Address';
import Transaction from '../transaction/Transaction';
import { ErrorNotificationFactory } from '../notification/NotificationFactory';

const uuidv4 = require('uuid/v4');

export default class BitcoinCash extends Coin {
  constructor(coinslug = 'zcash', ticker = 'zec', coinName = 'ZCash') {
    super(coinslug, ticker, coinName);
    this.baseConversion = 100000000;
  }
  static baseConversion = 100000000;
  /**
   * Checks the balance of a given Address using this coin
   * @param address the Address Object that we are querying
   */
  checkBalance = (address) => axios.get(`https://bccblock.info/api/addr/${address.publicKey}/?noTxList=1`).then((response) => {
    response.data.balance = response.data.balanceSat;
    response.data.total_received = response.data.totalReceivedSat;
    response.data.total_sent = response.data.totalSentSat;
    response.data.unconfirmed_balance = response.data.balanceSat;
    response.data.final_balance = response.data.balanceSat;
    response.data.n_tx = response.data.txApperances;
    response.data.unconfirmed_n_tx = response.data.unconfirmedTxApperances;
    response.data.final_n_tx = response.data.txApperances;
    return response;
  });

  /**
   * Get Recent Transactions for an Address
   * @param address the Address Object that we querying
   * @returns {array} of Transaction Objects for a given address
   */
  getRecentTransactions = (address) => axios.get(`https://api.zcha.in/v2/mainnet/accounts/${address.publicKey}/recv?limit=5&offset=0`).then((response) => {
    // List of Transaction Objects
    const listOfTrans = [];
    for (let i = 0; i < response.data.length; i++) {
      const toAddresses = [];
      const fromAddress = [];
      response.data[i].vin.forEach((addy) => {
        fromAddress.push({ address: addy.coinbase, amt: response.data[i].vout.value });
      });
      response.data[i].vout.forEach((addy) => {
        toAddresses.push({ address: addy.scriptPubKey.addresses[0], amt: addy.value });
      });
      listOfTrans.push(new Transaction(uuidv4(), toAddresses, fromAddress));
    }
    return listOfTrans;
  });

  /**
   * Generates a new Key Pair
   */
  generateNewAddress = () => {
    ErrorNotificationFactory('Cannot Create Address', 'Cannot Create Addresses With ZCash Currently');
    throw new Error('Cannot Create Address With This Coin');
  }

}
