const uuidv4 = require('uuid/v4');

export default class Transaction {
  /**
   * Cretes Transactions
   * @param id of the transaction
   * @param addressesTo an array  of addresses
   * @param addressFrom an array of addresses and the amt going to each address in obj {address: "", amt: 0}
   * @param typeOfTransaction one of three types of transactions in constant transactions types
   */
  constructor(id = uuidv4(), addressesTo, addressFrom, typeOfTransaction = 'transfer') {
    this.id = id;
    this.addressesTo = addressesTo;
    this.addressFrom = addressFrom;
    this.typeOfTransaction = typeOfTransaction;
  }
}
