import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { IconButton, IconMenu, MenuItem, Paper } from 'material-ui';
import { coinDictionary } from '../../lib/coins/coinList';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { dispatch } from 'react-redux';
import { store } from './../../index';
import { DELETE_WALLET, UPDATE_SELECTED_WALLET } from '../../actions/wallets';
import styles from './wallets.css';
import { Area, AreaChart } from 'recharts';
import { hist } from './../../index';
import axios from 'axios';
import { abbreviateNumber } from '../../lib/commons/util';

export default class IndividualWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinvalue: 0,
      coinAmt: 0,
      renderAgain: true
    };
  }

  componentDidMount = () => {
    this.updateInformation();
  };

  updateInformation = () => {
    this.setState({ coinAmt: parseFloat(this.props.wallet.getCoinAmount()) });
  };

  render() {
    const doesValueExist = this.props.coinValues.findIndex(value => value.coin === this.props.wallet.coinType);
    return (
      <div className={styles.cryptosContainer} onClick={(e) => { store.dispatch(UPDATE_SELECTED_WALLET(this.props.wallet.id)); hist.push('/selectedWallet'); }}>
        <div className={styles.cryptoNameContainer}>
          <img
            className={styles.walletImg}
            src={coinDictionary[this.props.wallet.coinType].logo}
          />
        </div>
        <div className={styles.walletInfo}>
          <div className={styles.walletInfoName}>{this.props.wallet.name}</div>
          <div className={styles.walletInfoCoinInfo}>
            <div className={styles.walletInfoCoinInfoType}>{coinDictionary[this.props.wallet.coinType].ticker}</div>
          </div>
          <div>{this.props.wallet.coinAmt.toFixed(8)}</div>
        </div>
        <div className={styles.stockButtonContainer}>
          <div className={styles.stockButton}>
            {doesValueExist < 0 ? 'N/A' : `$${((this.props.coinValues[doesValueExist].value * this.props.wallet.coinAmt).toFixed(2))}`}
          </div>
        </div>
      </div>

    );
  }
}
