import storeManager from './../lib/storage/StorageManager';
import {LOAD_THE_SETTINGS, SET_THE_SUBREDDITS} from "../actions/settings";
const initialState = {
  newsFeed: {
    subreddits: ['CryptoCurrency'],
  },
};


export default function walletManager(state = initialState, action) {
  let newState;
  newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_THE_SETTINGS:
      newState = action.settingsObj;
      return newState;
    case SET_THE_SUBREDDITS:
      newState = Object.assign({}, state);
      newState.newsFeed.subreddits = action.subreddits;
      storeManager.saveSettings(newState);
      return newState;
    default:
      return state;
  }
}
