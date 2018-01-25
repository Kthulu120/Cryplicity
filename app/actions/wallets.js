import Wallet from './../lib/wallet/Wallet';

export const CREATE_A_WALLET = 'CREATE_WALLET';
export const DELETE_A_WALLET = 'DELETE_WALLET';
export const UPDATE_A_WALLET = 'UPDATE_WALLET';
export const UPDATE_A_SELECTED_WALLET = 'UPDATE_SELECTED_WALLET';
export const SET_ALL_WALLETS = 'SET_WALLETS';

export const CREATE_WALLET = (wallet) => ({
  type: CREATE_A_WALLET,
  wallet
});

export const DELETE_WALLET = (walletId) => ({
  type: DELETE_A_WALLET,
  id: walletId
});


export const UPDATE_WALLET = (walletId, walletInfo) => ({
  type: UPDATE_A_WALLET,
  id: walletId,
  walletInfo
});

export const UPDATE_SELECTED_WALLET = (walletId, wallet) => ({
  type: UPDATE_A_SELECTED_WALLET,
  id: walletId,
  wallet
});

export const SET_WALLETS = (walletArray) => ({
  type: SET_ALL_WALLETS,
  walletArray
});
