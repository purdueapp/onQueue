import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaCopy } from 'react-icons/fa';
import { StyleSheet, css } from 'aphrodite';

let QRCode = require('qrcode.react');

export default function Code(props) {
  const [copySuccess, setCopySuccess] = useState('');
  let { hostID } = props;
  let url = `www.${window.location.hostname}/${hostID}`;

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

  return (
    <Row>
      <Col className='px-0 ' align='left'>
        <div style={container}>
          <p>
            Host ID: <b>{hostID}</b>
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
          <div className='p-2' style={{ background: 'white' }}>
            <QRCode
              value={url}
              size={130}
            />
          </div>

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
