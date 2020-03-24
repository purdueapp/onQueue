import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import { getAccessToken, setAccessToken } from '../actions/authActions';
import { setPlaybackState } from '../actions/playbackStateActions';
import { setPlayer } from '../actions/playerActions';
import { setSpotifyApi } from '../actions/spotifyApiActions';
import Script from 'react-load-script';
import { nextTrack, previousTrack } from '../actions/queueActions';

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
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      mobile: window.innerWidth <= 768
    }

    this.script = this.script.bind(this);
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.interval = setInterval(() => {
      let { setPlaybackState, player, queue, nextTrack, spotifyApi } = this.props;

      player.getCurrentState().then(state => {
        if (!state || !state.track_window) {
          return;
        }

        if (state.track_window.current_track.uri === 'spotify:track:7cvTBgG2OFDvY2pIl3WN9C') {
          if (queue.nextTracks.length !== 0) {
            spotifyApi.play({ uris: [queue.nextTracks[0].uri, 'spotify:track:7cvTBgG2OFDvY2pIl3WN9C'] }, (err, res) => {
              if (err) {
                console.log(err);
              }
            });
            nextTrack();
          }
        }
        else if (state.track_window.next_tracks.length !== 1) {
          this.props.spotifyApi.play({ uris: ['spotify:track:5xW6Gs4ZKePJOZguvG6RV8', 'spotify:track:7cvTBgG2OFDvY2pIl3WN9C'] }, (err, res) => {
            if (err) {
              console.log(err);
            }
          });
        }

        if (state.track_window.current_track.uri === 'spotify:track:7cvTBgG2OFDvY2pIl3WN9C') {
          return;
        }
        setPlaybackState(state);
      })
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
    if (this.props.auth.accessToken !== undefined) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        let accessToken = this.props.auth.accessToken;
        this.props.setSpotifyApi(accessToken);
        this.props.setPlayer(accessToken);
      };

      return (
        <Script url="https://sdk.scdn.co/spotify-player.js" />
      )
    }
    else {
      if (this.props.getAccessToken() !== undefined && this.props.getAccessToken() !== "undefined") {
        this.props.setAccessToken(this.props.getAccessToken());
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
          {this.script()}
        </Container>
      )
    }
  }
};

const mapStateToProps = state => ({
  playbackState: state.playbackState,
  auth: state.auth,
  queue: state.queue,
  player: state.player,
  spotifyApi: state.spotifyApi
})

const mapDispatchToProps = {
  setPlaybackState,
  getAccessToken,
  setAccessToken,
  setPlayer,
  setSpotifyApi,
  nextTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);