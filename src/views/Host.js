import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdSettings, MdSearch, MdFormatListNumbered } from 'react-icons/md';
import { FaQrcode } from 'react-icons/fa';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Queue from '../components/Queue';
import Player from '../components/Player';

import { getAccessToken } from '../actions/authActions';
import { setPlaybackState } from '../actions/playbackStateActions';

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

let settingsDiv = {
  backgroundColor: '#FFFFFF20',
  borderRadius: '25px',
  alignItems: 'center',
  justifyContent: 'center',
};

let sideBarStyle = {
  background: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  minWidth: '24em'
};

class Host extends Component {
  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let accessToken = new URLSearchParams(this.props.location.search).get('accessToken');

      const player = new window.Spotify.Player({
        name: 'onQueue Player',
        getOAuthToken: cb => { cb(accessToken); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        if (state == null) {
          return;
        }

        this.props.setPlaybackState(state);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        this.setDevice(device_id);
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }

  setDevice(deviceId) {
    let accessToken = new URLSearchParams(this.props.location.search).get('accessToken');

    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true,
      }),
    });
  }

  render() {
    return (
      <Container className='p-0' fluid style={containerStyle}>
        <Navbar fixed='top' bg='clear' variant='dark'>
          <Nav className='mx-auto mt-3'>

          </Nav>
        </Navbar>
        <Row className='w-100 h-100'>
          <Col lg={4} md={6} sm={8} className='mx-auto my-auto'>
            <Player />
          </Col>
          <Col lg={2} md={3} sm={4} className='m-0 px-5 py-4 h-100' style={sideBarStyle}>
            <div style={settingsDiv} className='p-1 mb-3'>
              <MdFormatListNumbered size='1.3em' className='mx-2' />
              <MdSearch size='1.3rem' className='mx-2' />
              <FaQrcode size='1.3rem' className='mx-2' />
              <MdSettings size='1.3rem' className='mx-2' />
            </div>
            <Queue location={this.props.location} />
          </Col>
        </Row>
      </Container>
    )
  }
};

const mapStateToProps = state => ({
  playbackState: state.playbackState
})

const mapDispatchToProps = {
  setPlaybackState,
  getAccessToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);