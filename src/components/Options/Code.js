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
    console.log(`${window.location.hostname}/${this.props.hostID}`)
    return(
      <Row>
          <Col className = 'px-0 '  align='left'>
            <p>
              Host ID: <b>{this.props.hostID}</b>
            </p>
            <p>
              QR Code
            </p>
            <div className='p-2' style={{ background: 'white' }}>
            <QRCode 
              value={`${window.location.hostname}/${this.props.hostID}`} 
              size={150}
            />
            </div>

          </Col>
      </Row>
    ) 
    }
}


export default Code;
