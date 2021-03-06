import React, { Component } from 'react';
import bg from '../images/bg.jpg'
import { uri } from 'react-querystring-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaSpotify } from 'react-icons/fa';

const { stringifyParams } = uri;

let scope = 'user-read-private user-read-email streaming user-modify-playback-state';
let redirectURI = `${window.location.origin}/callback`;
let loginURL = 'https://accounts.spotify.com/authorize' +
stringifyParams({
    response_type: 'code',
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: scope,
    redirect_uri: redirectURI,
    state: 'state123'
  });
  
  class Homepage extends Component {
    render() {
      return (
        <Container fluid style={containerStyle}>
        <Row className='w-100'>
          <Col md={6} className='mx-auto'>
            <h1 className='welcome-heading display-4 text-white'>onQueue</h1>
            <p>Make your Spotify queue public to you friends! <br /> Only works on Google Chrome and Firefox.</p>
            <Button href={loginURL} variant="success" className="m-1"><FaSpotify className='mr-2'/>Host a Room</Button>
            <Button href='rooms' variant="primary" className="m-1">Join A Room</Button>
          </Col>
        </Row>
        <div style={backgroundStyle} />
      </Container>
    )
  }
}

export default Homepage;

let backgroundStyle = {
  background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + bg + ')',
  backgrounColor: 'rgba(0, 0, 0, 0.5)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  position: 'absolute',
  filter: 'blur(0.5em)',
  WebkitFilter: 'blur(0.7em)',
  transform: 'scale(1.2)',
  zIndex: '-1',
  transition: 'background ease 2s',
};

let containerStyle = {
  textAlign: 'center',
  backgroundColor: '#191414',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}