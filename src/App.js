import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Host from './views/Host';
import Homepage from './views/Homepage';
import Callback from './views/Callback';
import Rooms from './views/Rooms';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/callback' component={Callback} />
      <Route exact path='/host/:id' component={Host} />
      <Route exact path='/rooms' component={Rooms} />
    </BrowserRouter>
  );
}

export default connect()(App);