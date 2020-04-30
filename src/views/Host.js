import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Player from '../components/Player';
import Background from '../components/Background';
import Sidebar from '../components/Sidebar';
import Script from 'react-load-script';
import { SIGNAL_TRACK, nextTrack, repeatTrack, setPlayer, setPlaybackState, getAccessToken, getRefreshToken, setTokens } from '../actions/spotifyActions';
import { setupHostSocket, setupUserSocket } from '../actions/socketActions';
import { setPlayerState, setHost } from '../actions/roomActions';

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
    let { setHost, socket, spotify, setupHostSocket, setupUserSocket, getAccessToken, room } = this.props;
    
    setupHostSocket(socket);
    setupUserSocket(socket);
    
    socket.connect();
    spotify.api.setAccessToken(getAccessToken());
    spotify.api.getMe((err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      
      setHost(user);
      
      socket.emit('create room', {
        host: user,
        private: false,
        accessToken: getAccessToken(),
        playerState: room.playerState
      })
      console.log('creating room');
    })
    
    this.interval = setInterval(() => {
      let { socket, player, playbackState, setPlaybackState, nextTrack, room, repeatTrack } = this.props;
      let { trackWindow } = this.props.spotify;
      
      if (!player || !player.getCurrentState || !playbackState || !playbackState.track_window) {
        return;
      }
      
      if (playbackState.track_window.current_track.uri === SIGNAL_TRACK ||
        playbackState.track_window.next_tracks.length !== 1) {
        if (room.playerState.repeat) {
          repeatTrack();
        }
        else {
          nextTrack();
        }
      }

      if (!playbackState.paused) {
        playbackState.position += 1000;
        setPlaybackState(playbackState);
      }

      let playerState = {
        duration: playbackState.duration,
        position: playbackState.position,
        paused: playbackState.paused,
      }

      if (trackWindow !== this.props.room.playerState.trackWindow) {
        playerState.trackWindow = trackWindow;
      }

      if (playerState !== this.props.room.playerState) {
        socket.emit('update', {
          type: 'playerState',
          playerState: playerState
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    let { socket } = this.props;
    socket.close();
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
      let { mobile } = this.state;
      
      
      
      return (
        <Container className='p-0 m-0 w-100' fluid style={containerStyle}>
        <Navbar fixed='top' bg='clear' variant='dark'>
          <Nav className='mx-auto mt-3'>

          </Nav>
        </Navbar>
        <Row className='w-100 h-100'>
          {mobile ?
            (
              <Col md={12} className='m-0 px-3 py-4 h-100' style={sideBarStyle}>
                <Sidebar />
              </Col>
            )
            :
            (
              <>
                <Col lg={4} md={6} sm={8} className='mx-auto my-auto'>
                  <Player />
                </Col>
                <Col lg={2} md={3} sm={4} className='m-0 px-5 py-4 h-100' style={sideBarStyle}>
                  <Sidebar />
                </Col>
              </>
            )
          }
        </Row>
        <Background />

        {this.script()}
      </Container>
    )
  }
};

const mapStateToProps = state => ({
  spotify: state.spotify,
  room: state.room,
  playbackState: state.spotify.playbackState,
  tokens: state.spotify.tokens,
  player: state.spotify.player,
  api: state.spotify.api,
  socket: state.socket
})

const mapDispatchToProps = {
  setPlaybackState,
  getAccessToken,
  getRefreshToken,
  setTokens,
  setPlayer,
  nextTrack,
  setPlayerState,
  setupHostSocket,
  setupUserSocket,
  setHost,
  repeatTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);

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