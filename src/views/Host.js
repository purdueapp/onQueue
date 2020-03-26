import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import Script from 'react-load-script';
import { DEFAULT_TRACK, SIGNAL_TRACK } from '../actions/spotifyActions';

import { nextTrack, previousTrack, setPlayer, setPlaybackState, getAccessToken, getRefreshToken, setTokens } from '../actions/spotifyActions';

let containerStyle = {
  textAlign: 'center',
//  backgroundColor: '#19141488',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 1
};

let sideBarStyle = {
  background: 'rgba(0, 0, 0, 0.3)',
  width: '100%',
  minWidth: '24em'
};

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      mobile: window.innerWidth <= 768,
    }

    this.script = this.script.bind(this);
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.interval = setInterval(() => {
      let { player, api, playbackState, trackWindow, setPlaybackState, nextTrack } = this.props;
      let { nextTracks } = trackWindow;

      if (!player || !player.getCurrentState || !playbackState || !playbackState.track_window) {
        return;
      }

      if (playbackState.track_window.current_track.uri === SIGNAL_TRACK ||
        playbackState.track_window.next_tracks.length !== 1) {
        nextTrack();
      }

      if (!playbackState.paused) {
        playbackState.position += 1000;
        setPlaybackState(playbackState);
      }

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  resize() {
    let currentMobile = (window.innerWidth <= 768);
    if (currentMobile !== this.state.hidePlayer) {
      this.setState({ mobile: currentMobile });
    }
  }

  script() {
    if (this.props.tokens.accessToken !== undefined) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.props.setPlayer();
      };

      return (
        <Script url="https://sdk.scdn.co/spotify-player.js" />
      )
    }
    else {
      if (this.props.getAccessToken() !== undefined && this.props.getAccessToken() !== "undefined") {
        this.props.setTokens({
          accessToken: this.props.getAccessToken(),
          refreshToken: this.props.getRefreshToken()
        });
        return <Fragment />
      }
      else {
        return <Redirect to='/' />
      }
    }
  }

  render() {
    if (this.state.mobile) {
      return (
        <Container className='p-0' fluid style={containerStyle}>
          <Navbar fixed='top' bg='clear' variant='dark'>
            <Nav className='mx-auto mt-3'>

            </Nav>
          </Navbar>
          <Row className='w-100 h-100'>
            <Col md={12} className='m-0 px-3 py-4 h-100' style={sideBarStyle}>
              <Sidebar />
            </Col>
          </Row>
          {this.script()}
        </Container>
      )
    }
    else {
      return (
        <Container className='p-0 m-0 w-100' fluid style={containerStyle}>
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
          {this.script()}
        </Container>
      )
    }
  }
};

const mapStateToProps = state => ({
  playbackState: state.spotify.playbackState,
  tokens: state.spotify.tokens,
  player: state.spotify.player,
  api: state.spotify.api,
  trackWindow: state.spotify.trackWindow
})

const mapDispatchToProps = {
  setPlaybackState,
  getAccessToken,
  getRefreshToken,
  setTokens,
  setPlayer,
  nextTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);