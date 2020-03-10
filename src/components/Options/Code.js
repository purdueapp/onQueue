import React, { Component } from 'react';
import {Row, Col } from 'react-bootstrap';

var QRCode = require('qrcode.react');

class Code extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomURL: '"http://localhost:7373/host/tobi',
      roomCode: "ABCD",
    }

  }


  render() {

    return(
      <Row>
          <Col className = 'px-0 '  align='left'>
            <p>
              Code: <b>{this.state.roomCode}</b> 
            </p>
            <p>
              QR Code
            </p>
            <QRCode 
              value={this.state.roomURL} 
              size='50'/>
          </Col>
      </Row>
    ) 
    }
}


export default Code;
