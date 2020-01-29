import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Callback extends Component {
  render() {
    // Setup some stuff
    return <Redirect to='/host/tobi' />
  }
};

export default Callback