import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Host from './views/Host';
import Homepage from './views/Homepage';
import Callback from './views/Callback';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/callback' component={Callback} />
      <Route exact path='/host/:id' component={Host} />
      <Route exact path='/:id' component={Host} />
    </BrowserRouter>
  );
}

export default App;


////      {/*  */}
