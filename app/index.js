import installExtension, {
  EMBER_INSPECTOR, REACT_DEVELOPER_TOOLS,
  BACKBONE_DEBUGGER, JQUERY_DEBUGGER,
  ANGULARJS_BATARANG, VUEJS_DEVTOOLS,
  REDUX_DEVTOOLS, REACT_PERF,
  CYCLEJS_DEVTOOL, MOBX_DEVTOOLS,
} from 'electron-devtools-installer';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

export const store = configureStore();
export const hist = history;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
