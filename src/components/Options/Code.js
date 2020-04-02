import React, { useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaCopy } from 'react-icons/fa';
import { StyleSheet, css } from 'aphrodite';

let QRCode = require('qrcode.react');

export default function Code(props) {
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    let dummy = document.createElement('input');
    let text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    setCopySuccess('Copied!');
  };

  return(
    <Row>
        <Col className='px-0 ' align='left'>
          <div style={container}>
            <p>
              Host ID: <b>{props.hostID}</b>
            </p>
            {
              document.queryCommandSupported('copy') &&
              <div>
                <button onClick={copyToClipboard} className={css(styles.iconOnly)}><FaCopy /></button> 
                {copySuccess}
              </div>
            }
          </div>
          <div>
            <p>
              QR Code
            </p>
            <QRCode 
              value={window.location.href} 
              size={50}
            />
          </div>
        </Col>
    </Row>
  )
};

const container = {
  display: 'flex',
};

const styles = StyleSheet.create({
  iconOnly: {
    background: 'transparent',
    color: 'white',
    border: 'none',
    transition: "all 0.2s",
    opacity: '1.0',
  
    ":hover": {
      opacity: '0.7',
    },
  },
});

/*
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

let QRCode = require('qrcode.react');

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
              Host ID: <b>{this.props.hostID}</b>
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
*/
