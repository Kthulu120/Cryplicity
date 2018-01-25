// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import walletManager from './walletManager';
import chartsManager from "./chartsManager";
import storeManager from "./storeManager";
import {reducer as notificationsReducer} from 'reapop';

const rootReducer = combineReducers({
  counter,
  notifications: notificationsReducer(),
  router,
  walletManager,
  chartsManager,
  storeManager
});

export default rootReducer;
