import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import { Col } from 'react-flexbox-grid';
import { ConnectedRouter } from 'react-router-redux';
import { NavLink } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import WalletCreationModal from '../components/WalletCreationModal';
// this also works with react-router-native

const state = {
  closeModal: false
};
export default class TabsExampleIconText extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false };
  }

  render() {
    return (
      <Col s={12}>
        <ConnectedRouter history={this.props.history}>

          <Tabs>
            <Tab
              icon={<FontIcon className="material-icons">home</FontIcon>}
              label="HOME"
              onActive={(tab) => { this.props.history.push('/'); }}
            />
            <Tab
              icon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
              data-route="/wallets"
              label="WALLETS"
              onActive={(tab) => { this.props.history.push('/wallets'); }}
            />
            <Tab
              icon={<FontIcon className="material-icons">assessment</FontIcon>}
              label="PORTFOLIO"
              onActive={(tab) => { this.props.history.push('/portfolio'); }}
            />
            <Tab
              icon={<FontIcon className="material-icons">dvr</FontIcon>}
              label="NEWS FEED"
              onActive={(tab) => { this.props.history.push('/news'); }}
            />
            <Tab
              icon={<FontIcon className="material-icons">whatshot</FontIcon>}
              label="ICOs"
              onActive={(tab) => { this.props.history.push('/ico'); }}
            />
            <Tab
              icon={<FontIcon className="material-icons">favorite</FontIcon>}
              label="Donate"
              onActive={(tab) => { this.props.history.push('/donate'); }}
            />
            <Tab icon={<div onClick={(e) => {this.setState({ isModalVisible: true }); }}><FontIcon className="material-icons" color="rgba(255, 255, 255, 0.7)">dvr</FontIcon></div>} label="ADD NEW" />
          </Tabs>
        </ConnectedRouter>
        <WalletCreationModal closeModal={(bool) => { this.setState({ isModalVisible: bool }); }} isVisible={this.state.isModalVisible} />

      </Col>
    );
  }
}
