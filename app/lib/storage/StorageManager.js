import Wallet from './../wallet/Wallet';
import { dispatch } from 'react-redux';
import { store } from './../../index';
import { SET_WALLETS } from '../../actions/wallets';
import { LOAD_SETTINGS } from '../../actions/settings';

const os = require('os');
const storage = require('electron-json-storage');

const settingsStore = {
  newsFeed: {
    subreddits: ['CryptoCurrency'],
  },
};

/**
 * Manages the persistence of the application
 */
class StoreManager {
  constructor() {
    this.store = storage;
    this.wallets = { wallets: [] };
    this.initializeStore();
  }

  /**
   * Initializes the wallets in the persistent-store and in the
   * StoreManager instance
   */
  initializeStore = () => {
    this.store.has('wallets', (error, hasKey) => {
      if (error) {
        throw error;
      }
      if (!hasKey) {
        this.store.set('wallets', { wallets: [] });
      } else {
        // this.loadWWallets(this.store.get('wallets'));
        this.store.get('wallets', (writeError, data) => {
          this.loadWWallets(data);
        });
      }
    });

    this.store.has('settings', (error, hasKey) => {
      if (error) {
        throw error;
      }
      if (!hasKey) {
        this.store.set('settings', settingsStore);
      } else {
        this.store.get('settings', (writeError, data) => {
          this.loadSettings(data);
        });
      }
    });
  };

  deleteWallet = (publicKey) => {
    this.wallets.wallets = this.wallets.wallets.filter(e => e.publicKey !== publicKey);
    this.store.set('wallets', this.wallets);
  };

  createWallet = (publicKey, passphrase, privateKey, coinType) => {
    const wallet = Wallet(publicKey, passphrase, privateKey, coinType);
    this.wallets.wallets.push(wallet);
    this.saveWallets(this.wallets);
  };

  updateWallet = (publicKey, newWallet) => {
    const elementIndex = this.wallets.findIndex(wallet =>
      (wallet.id === newWallet.publicKey));
    if (elementIndex > -1) {
      this.wallets.wallets[elementIndex] = newWallet;
      this.saveWallets();
    }
  };
  /**
   * Loads all of the wallets from storage if they exist
   * @param stringArray - depreciated to be removed
   */
  loadWWallets = (stringArray) => {
    const tempWallets = [];
    this.store.get('wallets', (error, data) => {
      const arr = data.wallets;
      let tempW;
      for (let i = 0; i < arr.length; i++) {
        tempW = Wallet.parseWalletObject(arr[i]);
        tempWallets.push(tempW);
      }
      this.wallets = { wallets: tempWallets };
      this.saveWallets(this.wallets);
      store.dispatch(SET_WALLETS(this.wallets.wallets));
      this.wallets.wallets.forEach((wallet) => wallet.getBalancesForAddresses());
    });
  };

  saveWallets = (wallets) => {
    this.wallets = wallets;
    this.store.set('wallets', wallets);
  };

  saveSettings = (settingsObj) => {
    this.store.set('settings', settingsObj);
  };

  loadSettings = (settings) => {
    store.dispatch(LOAD_SETTINGS(settings));
  };
}

const storeManager = new StoreManager();
export default storeManager;
