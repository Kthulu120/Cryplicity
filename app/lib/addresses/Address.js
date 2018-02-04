import Transaction from '../transaction/Transaction';

const CryptoJS = require('crypto-js');

export default class Address {
  constructor(publicKey, privateKey, address = '', passphrase, isEncrypted = false, encryptedDetails = {}) {
    this.publicKey = publicKey;
    this.total_received = 0;
    this.address = address;
    this.total_sent = 0;
    this.balance = 0;
    this.unconfirmed_balance = 0;
    this.final_balance = 0;
    this.num_tix = 0;
    this.unconfirmed_num_tx = 0;
    this.final_num_tix = 0;
    this.transactions = [];
    if (isEncrypted) {
      this.encryption = encryptedDetails;
    } else {
      const encrypted = CryptoJS.AES.encrypt(privateKey, passphrase);
      this.encryption = {
        ciphertext: encrypted.ciphertext,
        salt: encrypted.salt
      };
    }
  }
  static parseAddresstObject = (obj) => {
    const publicKey = obj.publicKey;
    const encryption = {
      ciphertext: obj.encryption.ciphertext,
      salt: obj.encryption.salt
    };
    const addy = new Address(publicKey, '', obj.address, '', true, encryption);
    for (let i = 0; i < obj.transactions.length; i += 1) {
      addy.transactions.push(new Transaction(obj.transactions[i].id, obj.transactions[i].addressesTo, obj.transactions[i].addressFrom, obj.transactions[i].typeOfTransaction));
    }
    return addy;
  };

  /**
   * Deciphers an encrypted wallet if given the correct passphrase
   * @param passPhrase essentially the password being passed in to decrypt
   * @returns {{status: string, message: string}} A response object detailing the if the phrase deciphered a private key
   */
  decipher = (passPhrase) => {
    const response = { status: 'error', message: '' };
    const decrypted = CryptoJS.AES.decrypt(this.encryption, passPhrase);
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (result === '') {
      response.message = 'This is not the correct passphrase';
      return response;
    }
    response.status = 'success';
    response.message = `Your private key is: ${result}`;
    response.passphrase = result;
    return response;
  };
}
