/**
 * The Coin class serves as a base for specific Coin's to be implemented,
 */
import axios from 'axios';
import Coin from './Coin';
import Transaction from '../transaction/Transaction';
import API_KEYS from './../../utils/API_KEY';

const uuidv4 = require('uuid/v4');

/**
 * The Litecoin implementation from Coin
 */
export default class Ethereum extends Coin {
  constructor(coinslug = 'ethereum', ticker = 'eth', coinName = 'bitcoin') {
    super(coinslug, ticker, coinName);
    this.baseConversion = 1000000000000000000;
  }
  static baseConversion = 1000000000000000000;
  /**
   * Checks the balance of a given Address using this coin
   * @param address
   */
  checkBalance = (address) => axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address.publicKey}&tag=latest&apikey=8YSE7JI6FP8KBXE6TR7XFY2CU5AUAQKWB6`).then((response => {
    response.data.balance = parseFloat(response.data.result);
    response.data.total_received = 0;
    response.data.total_sent = 0;
    response.data.unconfirmed_balance = 0;
    response.data.final_balance = parseFloat(response.data.result);
    response.data.n_tx = 0;
    response.data.unconfirmed_n_tx = 0;
    response.data.final_n_tx = 0;
    return response;
  }));

  /**
   * Get Recent Transactions for an Address
   * @param address the Address Object that we querying
   * @returns {array} of Transaction Objects for a given address
   */
  getRecentTransactions = (address) => axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address.publicKey}&startblock=0&endblock=99999999&page=1&offset=30&sort=asc&apikey=8YSE7JI6FP8KBXE6TR7XFY2CU5AUAQKWB6`).then((response) => {
    // List of Transaction Objects
    const listOfTrans = [];
    for (let i = 0; i < response.data.result.length; i++) {
      const toAddresses = [];
      const fromAddress = [];
      const transaction = response.data.result[i];
      console.log(transaction);
      fromAddress.push({ address: [transaction.from], amt: (transaction.value / this.baseConversion) });
      toAddresses.push({ address: [transaction.to], amt: (transaction.value / this.baseConversion) });
      listOfTrans.push(new Transaction(uuidv4(), toAddresses, fromAddress));
    }
    return listOfTrans;
  });

  /**
   * Generates a new Key Pair
   */
  generateNewAddress = () => axios.post(`https://api.blockcypher.com/v1/eth/main/addrs?token=${API_KEYS.BlockCypher}`)
}
