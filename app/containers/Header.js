import React, { Component } from 'react';
import { Drawer, FontIcon, MenuItem } from 'material-ui';
import { Col, Row } from 'react-flexbox-grid';
import { Link, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import WalletCreationModal from '../components/WalletCreationModal';
import styles from './header.css';

const menuStyle = {
  color: '#7C7AAE'
};

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false };
  }

  render() {
    return (
      <div className={styles.navBarContainer}>
        <ConnectedRouter history={this.props.history}>
          <div className={styles.navBar}>
            <div className={styles.logo}>
              Cryplicity
            </div>
            <NavLink to="/" activeClassName={'active-nav'}>
              <MenuItem style={menuStyle} leftIcon={<FontIcon className="material-icons" style={menuStyle}>assessment</FontIcon>}>Cryptos</MenuItem></NavLink>
            <NavLink to="/wallets" activeClassName={'active-nav'}>
              <MenuItem style={menuStyle} leftIcon={<FontIcon className="material-icons" style={menuStyle}>account_balance_wallet</FontIcon>}>Wallets</MenuItem></NavLink>
            <NavLink to="/news" activeClassName={'active-nav'}>
              <MenuItem
                style={menuStyle}
                leftIcon={<FontIcon className="material-icons" style={menuStyle}>book</FontIcon>}
              >News
                Feed</MenuItem></NavLink>
            <WalletCreationModal />
            <MenuItem
              onClick={(e) => {this.setState({ isModalVisible: true }); }}
              style={menuStyle}
              leftIcon={<FontIcon
                className="material-icons"
                style={menuStyle}
              >add_box</FontIcon>}
            >Add Wallet</MenuItem>
          </div>
        </ConnectedRouter>
        <WalletCreationModal closeModal={(bool) => { this.setState({ isModalVisible: bool }); }} isVisible={this.state.isModalVisible} />
      </div>
    );
  }

}
