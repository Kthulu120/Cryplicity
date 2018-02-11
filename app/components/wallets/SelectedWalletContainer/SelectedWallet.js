import React, { Component } from 'react';
import styles from './selectedwallet.css';
import TransactionTable from './components/TransactionTable/TransactionTable';
import { WalletBalanceCard } from './components/WalletBalanceCard';
import axios from 'axios';
import moment from 'moment';
import { HistoricalPriceChart } from './components/HistoricalPriceChart/HistoricalPriceChart';
import { Checkbox, Divider, List, ListItem, Subheader, Toggle } from 'material-ui';
import MobileTearSheet from './components/MobileTearSheet';
import { AddressesTable } from './components/AddressesTable/AddressesTable';
import AddRemoveAddressModal from './components/AddRemoveAdressess/AddRemoveAddressModal';
import { hist, store } from '../../../index';
import { DELETE_WALLET } from '../../../actions/wallets';
import {ErrorNotificationFactory} from "../../../lib/notification/NotificationFactory";

export default class SelectedWallet extends Component {
  constructor(props) {
    super(props);
    this.state = { historicalChart: [],
      addressModalVisible: false,
    };
    this.updateChart();
  }
  transformUnixToHuman = (data) => {
    for (let i = 0; i < data.length; i++) {
      data[i].time = moment.unix(data[i].time).format('MM/DD/YYYY');
    }
    return data;
  };


  /**
   * Populates the
   */
  updateChart = () => {
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.props.selectedWallet.coin.ticker}&tsym=USD&limit=60&aggregate=1&e=CCCAGG`).then((response) => {
      this.setState({ historicalChart: this.transformUnixToHuman(response.data.Data) });
    });
    try{
      this.props.selectedWallet.getRecentTransactions();
    }catch (e){
     // ErrorNotificationFactory(e);
      console.log(e);
    }

    this.setState(this.state);
  };

  handleAddressModal = (bool) => {
    this.setState({ addressModalVisible: bool });
  };
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.walletBalanceTrans}>
          <MobileTearSheet height={450}>
            <List>
              <Subheader>Actions</Subheader>
              <ListItem
                primaryText="Add/Remove Address"
                secondaryText="Add/Remove Addresses To See Your Balance"
                onClick={(e) => { this.handleAddressModal(true); }}
              />
              <ListItem
                disabled
                primaryText="View Smart Contracts"
                secondaryText="View Smart Contracts in this Wallet(Ethereum Only)"
              />
              <ListItem
                disabled
                primaryText="Create Smart Contract"
                secondaryText="Code A Smart Contract(Ethereum Only)"
              />
              <ListItem
                onClick={(e) => { hist.push('/'); store.dispatch(DELETE_WALLET(this.props.selectedWallet.id)); }}
                primaryText="Delete This Wallet"
                secondaryText="Delete This Wallet(CAN'T GO BACK)"
              />
            </List>
          </MobileTearSheet>

          <TransactionTable wallet={this.props.selectedWallet} addresses={this.props.selectedWallet.addresses} />
        </div>
        <div className={styles.walletAddressAndGraphContainer}>
          <AddressesTable addresses={this.props.selectedWallet.addresses} />
          <HistoricalPriceChart data={this.state.historicalChart} />
        </div>
        <AddRemoveAddressModal addresses={this.props.selectedWallet.addresses} addressModalVisible={this.state.addressModalVisible} handleAddressModal={this.handleAddressModal} selectedWallet={this.props.selectedWallet} />
      </div>
    );
  }

}
