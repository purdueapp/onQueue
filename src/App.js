import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Host from './views/Host';
import Homepage from './views/Homepage';
import Callback from './views/Callback';
import Rooms from './views/Rooms';
import User from './views/User';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/callback' component={Callback} />
      <Route exact path='/host/:id' component={Host} />
      <Route exact path='/host' component={Host} />
      <Route exact path='/rooms' component={Rooms} />
      <Route exact path='/:id' component={User} />
    </Switch>
  );
}

export default connect()(App);