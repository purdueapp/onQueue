import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdCast, MdFullscreen, MdPalette, MdSettings, MdSearch, MdFormatListNumbered, MdPlaylistAdd } from 'react-icons/md';
import { FaPlay, FaBackward, FaForward, FaPause } from 'react-icons/fa';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Background from '../components/Background';
import Queue from '../components/Queue';
import Player from '../components/Player';

import { getAccessToken } from '../actions/authActions';
import { setPlaybackState } from '../actions/playbackStateActions';

let imageUrl = "https://i.scdn.co/image/cc4fd4d092849a8a9eb51ac159ec0951e65e27e7";  //"https://i.scdn.co/image/8480fa22ad7eb3e83478effba242df20447ba112";

let backgroundStyle = {
  background: "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(" + imageUrl + ")",
  backgrounColor: "rgba(0, 0, 0, 0.5)",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  position: "absolute",
  filter: "blur(1.2em)",
  WebkitFilter: "blur(1.2em)",
  transform: "scale(1.2)",
  zIndex: "-1",
  transition: "background ease 2s",
};

/*
let darken = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundPosition: "center top",
  background: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  zIndex: 1,
  height: "auto",
};
*/

let containerStyle = {
  textAlign: "center",
  backgroundColor: '#191414',
  color: 'white',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}





let filler = {
  background: "white",
  height: "100%",
  width: "60%",
  borderRadius: "inherit",
  transition: "width .2s ease-in",
};


let settingsDiv = {
  backgroundColor: "#FFFFFF20",
  borderRadius: "25px",
  alignItems: "center",
  justifyContent: "center",
 // height: "2em",
};

function getTime(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


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
      <Container className="p-0" fluid style={containerStyle}>
        <Navbar fixed="top" bg="clear" variant="dark">
          <Nav className="mx-auto mt-3">

          </Nav>
        </Navbar>
        <Row className="w-100 h-100">
          <Col lg={4} md={6} sm={8} className="mx-auto my-auto">
            <Player />
          </Col>
          <Col lg={2} md={3} sm={4} className="m-0 px-5 py-4 h-100" style={{ background: "rgba(0, 0, 0, 0.5)", width: "100%", minWidth: "24em" }}>

            <div style={settingsDiv} className="p-1 mb-3">
              <MdFormatListNumbered size="1.3em" />
              <MdSearch size="1.3rem" className="mx-3" />
              <MdSettings size="1.3rem" />
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
  setPlaybackState
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);