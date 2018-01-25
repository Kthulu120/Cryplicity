/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PassphraseGenerator from '../../lib/crypt/PassphraseGenerator';
import { FontIcon, MenuItem, SelectField, TextField } from 'material-ui';
import { coinList } from './../../lib/coins/coinList';
import { Col, Row } from 'react-flexbox-grid';

export default class AddressCreationModal extends React.Component {
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

  handleCoinTypeChange = (event, index, coin) => {
    this.setState({ coinType: coin });
  };

  checkIfValidModal = () => {
    let verified = false;
    if (this.state.passphrase !== '' && this.state.publicKey !== ''
      && this.state.privateKey !== '' && this.state.walletName !== '') {
      verified = true;
    }
    if (this.state.formVerified !== verified) {
      this.setState({ formVerified: verified });
    }
  };

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
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>

        <Dialog
          title="Add A New Address"
          actions={actions}
          modal
          open={this.props.isVisible}
        >
          <Row>
            <Col smOffset={1} sm={5}>
              <TextField
                hintText="Name"
                floatingLabelText="Name For Address"
                floatingLabelFixed
                value={this.state.walletName}
                onChange={(a, b) => { a.preventDefault(); this.setState({ walletName: b }); }}
              />
            </Col>
          </Row>
          <Row>
            <Col smOffset={1} sm={5}>
              <TextField
                hintText="Details About This Address"
                floatingLabelText={'Details About This Address'}
                floatingLabelFixed
                multiLine
                rows={1}
                rowsMax={4}
                value={this.state.walletDetails}
                onChange={(a, b) => { a.preventDefault(); this.setState({ walletDetails: b }); }}
              />
            </Col>

            <Col smOffset={1} sm={4}>
              <TextField
                hintText="Public Key For This Wallet"
                floatingLabelText={'Public Key For This Wallet'}
                floatingLabelFixed
                multiLine
                rows={1}
                rowsMax={4}
                value={this.state.publicKey}
                onChange={(a, b) => { a.preventDefault(); this.setState({ publicKey: b }); }}
              />
            </Col>
          </Row>
          <Row>

            <Col smOffset={1} sm={4}>
              <TextField
                hintText="Private Key For This This Wallet"
                multiLine
                floatingLabelText={'Private Key For This Wallet'}
                floatingLabelFixed
                rows={2}
                rowsMax={4}
                onChange={(a, b) => { a.preventDefault(); this.setState({ privateKey: b }); }}
              />
            </Col>
            <Col smOffset={1} sm={4}>
              <TextField
                hintText="Passphrase For This This Wallet (You may enter your own or generate one)"
                multiLine
                floatingLabelText={'Passphrase Key For Wallet'}
                floatingLabelFixed
                rows={2}
                rowsMax={4}
                value={this.state.passphrase}
                onChange={(a, b) => { a.preventDefault(); this.setState({ passphrase: b }); }}
              />
            </Col>
            <Col smOffset={1} sm={3}>
              <RaisedButton
                label="Generate Password"
                primary
                onClick={(a) => { this.setState({ passphrase: PassphraseGenerator.makeNormalPassword() }); }}
              />
            </Col>
          </Row>
        </Dialog>
      </div>
    );
  }
}
