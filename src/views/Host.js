import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import { getAccessToken } from '../actions/authActions';
import { setPlaybackState } from '../actions/playbackStateActions';
import { setPlayer } from '../actions/playerActions';
import { setSpotifyApi } from '../actions/spotifyApiActions';

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
};

let sideBarStyle = {
  background: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  minWidth: '24em'
};

class Host extends Component {
  componentWillMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let accessToken = this.props.getAccessToken();
      this.props.setSpotifyApi(accessToken);
      this.props.setPlayer(accessToken);
    };
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
            <Sidebar />
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
  getAccessToken,
  setPlayer,
  setSpotifyApi
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);