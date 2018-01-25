/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PassphraseGenerator from '../lib/crypt/PassphraseGenerator';
import { FontIcon, MenuItem, SelectField, TextField } from 'material-ui';
import { coinList } from './../lib/coins/coinList';
import { Col, Row } from 'react-flexbox-grid';
import { dispatch } from 'react-redux';
import { store } from './../index';
import Wallet from '../lib/wallet/Wallet';
import { CREATE_WALLET } from '../actions/wallets';

const uuidv4 = require('uuid/v4');


export default class WalletCreationModal extends React.Component {
  state = {
    open: false,
    passphrase: '',
    formVerified: false,
    coinType: '',
    walletName: '',
    walletDetails: '',
    publicKey: '',
    privateKey: '',
  };

  handleOpen = () => {
    this.props.closeModal(true);
  };

  handleClose = () => {
    this.props.closeModal(false);
  };
  handleSubmit = () => {
    store.dispatch(CREATE_WALLET(new Wallet(uuidv4(), this.state.passphrase, '', this.slugify(this.state.coinType), this.state.walletName, this.state.walletDetails)));
    this.props.closeModal(false);
  };

  handleCoinTypeChange = (event, index, coin) => {
    this.setState({ coinType: coin });
  };

  checkIfValidModal = () => {
    let verified = false;
    if (this.state.passphrase !== '' && this.state.coinType !== '' && this.state.walletName !== '') {
      verified = true;
    }
    if (this.state.formVerified !== verified) {
      this.setState({ formVerified: verified });
    }
  };
  slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled={!this.state.formVerified}
        onClick={this.handleSubmit}
      />,
    ];
    this.checkIfValidModal();
    return (
      <div>

        <Dialog
          title="Add A New Wallet"
          actions={actions}
          modal
          open={this.props.isVisible}
        >
          <Row>
            <Col smOffset={1} sm={5}>
              <SelectField
                value={this.state.coinType}
                onChange={(a, b, c) => {
                  this.setState({ coinType: c });
                  this.checkIfValidModal();}}
                floatingLabelText="Select Coin"
                maxHeight={250}
              >
                {coinList.map(coin => (
                  <MenuItem
                    value={coin.option}
                    key={coin.ticker}
                    primaryText={coin.option}
                    onClick={this.handleCoinTypeChange}
                  />
              ))}
              </SelectField>
            </Col>
            <Col smOffset={1} sm={5}>
              <TextField
                hintText="Name"
                floatingLabelText="Name For Wallet"
                floatingLabelFixed
                value={this.state.walletName}
                onChange={(a, b) => { a.preventDefault(); this.setState({ walletName: b }); this.checkIfValidModal(); }}
              />
            </Col>
          </Row>
          <Row>
            <Col smOffset={1} sm={5}>
              <TextField
                hintText="Details About This Wallet"
                floatingLabelText={'Details About This Wallet'}
                floatingLabelFixed
                multiLine
                rows={2}
                rowsMax={4}
                value={this.state.walletDetails}
                onChange={(a, b) => { a.preventDefault(); this.setState({ walletDetails: b }); }}
              />
            </Col>
            <Col smOffset={1} sm={4}>

              <TextField
                hintText="Passphrase For This This Wallet (You should generate one)"
                multiLine
                floatingLabelText={'Passphrase Key For Wallet'}
                floatingLabelFixed
                rows={2}
                rowsMax={4}
                value={this.state.passphrase}
                onChange={(a, b) => { a.preventDefault(); this.setState({ passphrase: b }); this.checkIfValidModal();}}
              />
            </Col>
            <Col sm={2}>
              <RaisedButton
                label="Generate Password"
                primary
                onClick={(a) => { this.setState({ passphrase: PassphraseGenerator.makeNormalPassword() }); this.checkIfValidModal();}}
              />
            </Col>
          </Row>
          <h4>Beware you need to be consistent with your passwords for addresses in this wallet, you should write down the password made here
          and use it for all addresses in this wallet otherwise your at easier risk of losing this information</h4>
        </Dialog>
      </div>
    );
  }
}
