import React from 'react';
import {Switch, Route} from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import {Drawer, MenuItem} from 'material-ui';
import {Col, Row} from 'react-flexbox-grid';

export default () => (
  <App>
    <Row>
      <Col sm={3}>
        <Drawer open docked>
          <MenuItem>Menu fdfddffddfItem</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </Col>
      <Col sm={9}>
        <Switch>
          <Route path="/counter" component={CounterPage}/>
          <Route path="/" component={HomePage}/>
        </Switch>
      </Col>
    </Row>
  </App>
);
