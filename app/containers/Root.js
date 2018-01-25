// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Drawer, MenuItem, MuiThemeProvider} from 'material-ui';
import {Main} from './Main';
import {Col, Row} from 'react-flexbox-grid';
import AltHeader from './AltHeader';
import Header from './Header';
import NotificationsSystem from 'reapop';
// 1. import theme
import theme from 'reapop-theme-wybo';

type RootType = {
  store: {},
  history: {}
};

const divStyle = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#FBFCFC'

}

export default function Root({store, history}: RootType) {
  return (
    <MuiThemeProvider>

      <Provider store={store}>
        <div>
          <NotificationsSystem theme={theme} />
          <div className="appContainer">
            <Header history={history} />
            <div style={divStyle}>
              <Main history={history} />
            </div>
          </div>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}
