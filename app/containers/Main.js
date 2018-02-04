import React from "react";
import {ConnectedRouter} from "react-router-redux";
import {Switch, Route} from 'react-router';
import {Col, Row} from 'react-flexbox-grid';
import WalletContainer from "./state/WalletContainer";
import {Paper} from "material-ui";
import styles from './main.css'
import SelectedWalletContainer from "./state/SelectedWalletContainer";
import CryptoStockHome from "../components/cryptostocks/CryptoStockHome";
import NewsFeedContainer from "./state/NewsFeedContainer";
export const Main = ({history}) => {

  return (
    <div className="container">
        <div className={styles.paperInnerContainer}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/wallets" component={WalletContainer}/>
              <Route path="/news" component={NewsFeedContainer} />
              <Route path="/selectedWallet" component={SelectedWalletContainer}/>
              <Route path="/settings" component={SelectedWalletContainer}/>
              <Route path="/" component={CryptoStockHome}/>
            </Switch>
          </ConnectedRouter>
        </div>
    </div>

  )
}
