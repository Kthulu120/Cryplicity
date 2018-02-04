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

export default class Dogecoin extends Coin {
  constructor(coinslug = 'dogecoin', ticker = 'doge', coinName = 'Dogecoin') {
    super(coinslug, ticker, coinName);
    this.baseConversion = 100000000;
  }
  static baseConversion = 100000000;
  /**
   * Checks the balance of a given Address using this coin
   * @param address the Address Object that we are querying
   */
  checkBalance = (address) => axios.get(`https://api.blockcypher.com/v1/doge/main/addrs/${address.publicKey}/balance`);

  /**
   * Get Recent Transactions for an Address
   * @param address the Address Object that we querying
   * @returns {array} of Transaction Objects for a given address
   */
  getRecentTransactions = (address) => axios.get(`https://prohashing.com/explorerJson/getTransactionsByAddress?$params=%7B%22page%22:1,%22count%22:20,%22filter%22:%7B%7D,%22sorting%22:%7B%22blocktime%22:%22asc%22%7D,%22group%22:%7B%7D,%22groupBy%22:null%7D&address=${address.publicKey}&coin_id=3`).then((response) => {
    // List of Transaction Objects
    const listOfTrans = [];
    for (let i = 0; i < response.data.data.length; i++) {
      const toAddresses = [];
      const fromAddress = [];
      const transaction = response.data.data[i];
      if (transaction.value < 0) {
        fromAddress.push({ address: [address.publicKey], amt: (Math.abs(transaction.value)) });
        toAddresses.push({ address: ['N/A'], amt: (Math.abs(transaction.value)) });
      } else {
        fromAddress.push({ address: ['N/A'], amt: (Math.abs(transaction.value)) });
        toAddresses.push({ address: [address.publicKey], amt: (Math.abs(transaction.value)) });
      }
      listOfTrans.push(new Transaction(uuidv4(), toAddresses, fromAddress));
    }
    return listOfTrans;
  });

  /**
   * Generates a new Key Pair
   */
  generateNewAddress = () => axios.post(`https://api.blockcypher.com/v1/doge/main/addrs?token=${API_KEYS.BlockCypher}`)

}
