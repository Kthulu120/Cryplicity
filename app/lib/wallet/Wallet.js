/**
 * The wallet class that manages a wallet
 */
const CryptoJS = require('crypto-js');

import { coinDictionary } from './../coins/coinList';
import {ErrorNotificationFactory} from "../notification/NotificationFactory";
import { UPDATE_WALLET } from '../../actions/wallets';
import Address from '../addresses/Address';
import { coinObjectDictionary } from '../coins/coinList';
import { store } from './../../index';
import dispatch from 'redux';

const uuidv4 = require('uuid/v4');

export default class Wallet {
  /**
   *  The constructor takes in the information that is standard for all wallets regardless of the coin base type
   * @param id The public key for the wallet that we are managing
   * @param passphrase The passphrase/password for the given wallet to access the privateKey of the wallet
   * @param privateKey the privateKey of the string itself, note that this is
   * note stored in the object itself but merely taken in to encrypt it
   * @param coinType the coin name
   * @param name
   * @param details
   * @param isencrypted
   * @param encryptedDetails
   */
  constructor(id = uuidv4(), passphrase, privateKey, coinType, name = '', details = '', isencrypted = false, encryptedDetails = {},) {
    this.id = id;
    this.coinType = coinType;
    // We want to reference the a predefined Coin object and keep Coin Child References safe
    this.coin = coinObjectDictionary[coinType];
    this.name = name;
    this.addresses = [];
    this.details = details;
    this.balance = 0;
    this.coinAmt = 0;
    if (isencrypted) {
      this.encryption = encryptedDetails;
    } else {
      const encrypted = CryptoJS.AES.encrypt(privateKey, passphrase);
      this.encryption = {
        ciphertext: encrypted.ciphertext,
        salt: encrypted.salt
      };
    }
  }

  /**
   * Deciphers an encrypted wallet if given the correct passphrase
   * @param passPhrase essentially the password being passed in to decrypt
   * @returns {{status: string, message: string}}
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
    return response;
  };
  /**
   * Parse a stringified Wallet object
   * @param obj the Stringified Wallet obj
   * @returns {Wallet}
   */
  static parseWalletObject = (obj) => {
    const id = obj.id;
    const coinType = obj.coinType;
    const name = obj.name;
    const details = obj.details;
    const encryption = {
      ciphertext: obj.encryption.ciphertext,
      salt: obj.encryption.salt
    };
    const returnWallet = new Wallet(id, '', '', coinType, name, details, true, encryption);
    for (let i = 0; i < obj.addresses.length; i++) {
      returnWallet.addresses.push(new Address(obj.addresses[i].publicKey, '', '', '', true, obj.addresses[i].encryption));
    }
    return returnWallet;
  };

  /**
   * Encrypts A New Address If The User Add A pre-existing one
   * @param privateKey
   * @param publicKey
   * @param passphrase
   */
  encryptNewAddress = (privateKey, publicKey, passphrase) => {
    const encrypted = CryptoJS.AES.encrypt(privateKey, passphrase);
    const encryption = {
      ciphertext: encrypted.ciphertext,
      salt: encrypted.salt
    };
  };

  /**
   *  Allows users to create a new address from pre-existing one
   * @param privateKey the privateKey of the Address
   * @param publicKey the public key of the address
   * @param address the address also known ass the compressed address
   * @param passphrase
   */
  addExistingAddress = (privateKey, publicKey, address, passphrase) => {
    this.addresses.push(new Address(publicKey, privateKey, address, passphrase));
    store.dispatch(UPDATE_WALLET(this.id, this));
  };

  /**
   * Creates a new Address From A promise from coin then updates the store wallet
   * @param passphrase
   */
  createNewAddress = (passphrase) => {
    this.coin.generateNewAddress(passphrase).then((response) => {
      const privKey = response.data.private;
      const pub = response.data.public;
      const addy = response.data.address;
      // const wif = response.data.wif;
      const a = new Address(pub, privKey, addy, passphrase, false, {});
      this.addresses.push(a);
      store.dispatch(UPDATE_WALLET(this.id, this));
    }).catch(console.log('Nevermind'));
  };
  /**
   * Delete Address return itself
   * @param publicKey
   * @returns {Wallet}
   */
  deleteAddress = (publicKey) => {
    this.addresses = this.addresses.filter(e => e.publicKey !== publicKey);
    return this;
  };

  /**
   * Gets The coinAmt for all Addresses
   * @return the value of all the addresses
   * @returns {number}
   */
  getCoinAmount = () => {
     this.coinAmt = 0;
    for (let i = 0; i < this.addresses.length; i += 1) {
      console.log((this.addresses[i].balance / this.coin.baseConversion));
      this.coinAmt += (this.addresses[i].balance / this.coin.baseConversion);
    }
    store.dispatch(UPDATE_WALLET(this.id, this));
    return this.coinAmt;
  };

  /**
   * Gets the transaction balances for each address in this wallet
   */
  getBalancesForAddresses = () => {
    this.balance = 0;
    for (let i = 0; i < this.addresses.length; i++) {
      this.coin.checkBalance(this.addresses[i]).then((response) => {
        this.addresses[i].total_received = response.data.total_received;
        this.addresses[i].total_sent = response.data.total_sent;
        this.addresses[i].balance = response.data.balance;
        this.addresses[i].unconfirmed_balance = response.data.unconfirmed_balance;
        this.addresses[i].final_balance = response.data.final_balance;
        this.addresses[i].n_tx = response.data.n_tx;
        this.addresses[i].unconfirmed_n_tx = response.data.unconfirmed_n_tx;
        this.addresses[i].final_n_tx = response.data.final_n_tx;
        this.balance += (response.data.balance/ this.coin.baseConversion);
        store.dispatch(UPDATE_WALLET(this.id, this));
      });
    }
  };
  /**
   * Gets returned  promise of list of Transactions for each address
   */
  getRecentTransactions = () => {
    for (let i = 0; i < this.addresses.length; i++) {
      this.coin.getRecentTransactions(this.addresses[i]).then((response) => {
        this.addresses[i].transactions = response;
        store.dispatch(UPDATE_WALLET(this.id, this));
      });

    }
  };
  /**
   * Gets the private key for an address when the passphrase is correct otherwise return an empty string
   * @param publicKey the public key to search for
   * @param passphrase the passphrase for the application
   * @returns {string} The Private Key of The Address if Valid
   */
  getPrivateKeyForAddr = (publicKey, passphrase) => {
    const mainAddyIndex = this.addresses.findIndex(addy => addy.publicKey === publicKey);
    if (mainAddyIndex < 0) {
      ErrorNotificationFactory('Wrong PublicKey', 'That Public Key Does Not Exist' );
      return '';
    }
    const response = this.addresses[i].decipher(passphrase);
    if (response.status === 'error'){
      ErrorNotificationFactory('Incorrect Passphrase', response.message);
    }else{
      return response.passphrase;
    }
    return '';
  }
}
