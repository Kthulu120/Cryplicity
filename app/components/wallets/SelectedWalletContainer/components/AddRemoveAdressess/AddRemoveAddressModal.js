/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { store } from './../../../../../index';
import dispatch from 'redux';
import { UPDATE_WALLET } from '../../../../../actions/wallets';
import { TextField } from 'material-ui';
import { Col, Row } from 'react-flexbox-grid';

const divStyle = {
  display: 'flex',
  flexDirection: 'colunm',
  maxHeight: '200px',
  overflow: 'auto'
};
const initialState = {
  open: false,
  passphrase: '',
  generate: false,
  privateKey: '',
  createAddPreExistPubKey: '',
  createAddPreExistPrivKey: '',
  createAddPreExistAddy: '',
  createAddPreExistPass: '',
  unlockPubKey: '',
  unlockPass: '',
  unlockedPriv: ''
};
const borderStyle = {
  borderBottom: '1px solid black'
};
const marginStyle = {
  marginRight: 'auto',
  marginLeft: 'auto'
};
const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};
export default class AddRemoveAddressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      passphrase: '',
      generate: false,
      privateKey: '',
      createAddPreExistPubKey: '',
      createAddPreExistPrivKey: '',
      createAddPreExistAddy: '',
      createAddPreExistPass: '',
      unlockPubKey: '',
      unlockPass: '',
      unlockedPriv: ''
    };
  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState(initialState);
    this.props.handleAddressModal(false);
  };

  isGenerateDis = () => this.state.passphrase === '';

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal
          open={this.props.addressModalVisible}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
        >
          <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
            <div style={marginStyle}>
              <FlatButton
                disabled={this.isGenerateDis()}
                label="Generate New Address"
                onClick={(e) => {
                  this.props.selectedWallet.createNewAddress(this.state.passphrase);
                  this.setState({ passphrase: '' });
                  this.handleClose();
                }}
              />
            </div>
            <div style={marginStyle}>
              <TextField
                style={marginStyle}
                hintText="Enter Passphrase"
                value={this.state.passphrase}
                onChange={(e) => {
                  this.setState({ passphrase: e.target.value });
                }}

              />
            </div>
          </div>


          <div style={borderStyle} />

          <div style={{ textAlign: 'center' }}> Add Pre-Existing Address</div>
          <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
            <div style={marginStyle}>
              <TextField
                hintText="Enter Public Key"
                value={this.state.createAddPreExistPubKey}
                onChange={(e) => {
                  this.setState({ createAddPreExistPubKey: e.target.value });
                }}
              />
            </div>
            <div style={marginStyle}>
              <TextField
                hintText="Enter Private Key"
                value={this.state.createAddPreExistPrivKey}
                onChange={(e) => {
                  this.setState({ createAddPreExistPrivKey: e.target.value });
                }}
              />
            </div>
            <div style={marginStyle}>
              <TextField
                hintText="Address/Compressed Public Key"
                value={this.state.createAddPreExistAddy}
                onChange={(e) => {
                  this.setState({ createAddPreExistAddy: e.target.value });
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={marginStyle}>
              <TextField
                hintText="Passphrase(Password)"
                value={this.state.createAddPreExistPass}
                onChange={(e) => {
                  this.setState({ createAddPreExistPass: e.target.value });
                }}
              />
            </div>
            <div style={marginStyle}>
              <FlatButton
                label="Add"
                primary
                onClick={(e) => {
                  this.props.selectedWallet.addExistingAddress(this.state.createAddPreExistPrivKey, this.state.createAddPreExistPubKey, this.state.createAddPreExistAddy, this.state.createAddPreExistPass);
                  this.setState(initialState);
                }}
              />
            </div>
          </div>


          <div style={borderStyle} />
          <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
            <div style={marginStyle}>
              <TextField
                hintText="Enter Public Key"
                value={this.state.unlockPubKey}
                onChange={(e) => {
                  this.setState({ unlockPubKey: e.target.value });
                }}
                floatingLabelText={'Get Private Key with Passphrase'}
              />
            </div>
            <div style={marginStyle}>
              <TextField
                hintText="Passphrase to Unlock"
                value={this.state.unlockPass}
                onChange={(e) => {
                  this.setState({ unlockPass: e.target.value });
                }}
              />
            </div>
            <div style={marginStyle}>
              <FlatButton
                disabled={this.state.unlockPass === '' && this.state.unlockPubKey === ''}
                label="Unlock"
                primary
                onClick={(e) => {
                  this.setState({ unlockedPriv: this.props.selectedWallet.getPrivateKeyForAddr(this.state.unlockPubKey, this.state.unlockPass) });
                }}
              />
            </div>
          </div>


          {this.state.unlockedPriv === '' ? <div /> : <Row><Col sm={12}>{this.state.unlockedPriv}</Col></Row>}
          <div style={borderStyle} />
          <div style={divStyle}>
            {this.props.addresses.map((addy) => (
              <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }} key={Math.random()}>
                <div style={marginStyle}>
                  {addy.publicKey}
                </div>
                <div style={marginStyle}>
                  <FlatButton
                    label="Delete"
                    primary
                    onClick={(e) => {
                      store.dispatch(UPDATE_WALLET(this.props.selectedWallet.id, this.props.selectedWallet.deleteAddress(addy.publicKey)));
                      this.handleClose();
                    }}
                  />
                </div>
              </div>
          ))}
          </div>

        </Dialog>
      </div>
    );
  }
}
