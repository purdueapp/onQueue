import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

let QRCode = require('qrcode.react');
// let TinyURL = require('tinyurl');

class Code extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return(
      <Row>
          <Col className = 'px-0 '  align='left'>
            <p>
              Code: <b>{this.props.hostID}</b>
            </p>
            <p>
              QR Code
            </p>
            <QRCode 
              value={window.location.href} 
              size={50}
            />
          </Col>
      </Row>
    ) 
    }
}


export default Code;
