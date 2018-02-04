import { CREATE_A_WALLET, DELETE_A_WALLET, UPDATE_A_WALLET, SET_ALL_WALLETS, UPDATE_A_SELECTED_WALLET } from '../actions/wallets';
import storeManager from './../lib/storage/StorageManager';
const initialState = {
  wallets: [],
  selectedWallet: {}
};

// TODO: Integrate Redux Saga And get rid of unnecessary code
export default function walletManager(state = initialState, action) {
  let newState;
  switch (action.type) {
    case CREATE_A_WALLET:
      newState = Object.assign({}, state, { wallets: [...state.wallets, action.wallet] });
      storeManager.saveWallets({ wallets: newState.wallets });
      return newState;
    case DELETE_A_WALLET:
      newState = Object.assign({}, state, { wallets: state.wallets.filter(e => e.id !== action.id) });
      storeManager.saveWallets({ wallets: newState.wallets });
      return newState;
    case UPDATE_A_WALLET:
      const elementIndex = state.wallets.findIndex(wallet =>
        (wallet.id === action.id));
      if (elementIndex > -1) {
        const tempWallets = state.wallets;
        tempWallets[elementIndex] = action.walletInfo;
        newState = Object.assign({}, state, { wallets: tempWallets });
        storeManager.saveWallets({ wallets: newState.wallets });
        return newState;
      }
      break;
    case SET_ALL_WALLETS:
      newState = Object.assign({}, state, { wallets: action.walletArray });
      storeManager.saveWallets({ wallets: action.walletArray });
      return newState;
    case UPDATE_A_SELECTED_WALLET:
      const element = state.wallets.findIndex(wallet =>
        (wallet.id === action.id));
      if (element > -1) {
        newState = Object.assign({}, state, { selectedWallet: state.wallets[element] });
        return newState;
      }
      break;
    default:
      return state;
  }
}
