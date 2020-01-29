import React, { Component } from 'react';
import { MdCast, MdFullscreen, MdPalette, MdSettings, MdSearch } from 'react-icons/md';
import { FaPlay, FaBackward, FaForward, FaPause } from 'react-icons/fa';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Background from '../components/Background';


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
  color: "white",
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

let albumImage = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  //  height: "25em",
  width: "100%",
  //  marginTop: "10em",
};

let progressBar = {
  position: "relative",
  height: "0.7em",
  width: "100%",
  borderRadius: "3em",
  backgroundColor: "gray",
};

let filler = {
  background: "white",
  height: "100%",
  width: "60%",
  borderRadius: "inherit",
  transition: "width .2s ease-in",
};

let left = {
  float: "left",
};

let right = {
  float: "right",
};

let grey = {
  color: "lightgrey",
};

let settingsDiv = {
  //  margin: "10px",
  backgroundColor: "#FFFFFF20",
  borderRadius: "25px",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function getTime(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: 'Tobi Ola',
      trackName: 'Oh You Bring',
      imageURL: 'https://i.scdn.co/image/cc4fd4d092849a8a9eb51ac159ec0951e65e27e7',
      currentTime: '3:32',
      totalTime: '5:23',
      percent: 60,
      paused: true,
      position: 112342,
      duration: 324432
    };

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {

    window.onSpotifyWebPlaybackSDKReady = () => {
      let accessToken = new URLSearchParams(this.props.location.search).get('accessToken');
      let { Player } = window.Spotify;

      const player = new Player({
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
        console.log(state)

        this.setState({
          artists: state.track_window.current_track.artists.map(artist => artist.name).join(', '),
          imageURL: state.track_window.current_track.album.images[state.track_window.current_track.album.images.length - 1].url,
          trackName: state.track_window.current_track.name,
          currentTime: getTime(state.position),
          totalTime: getTime(state.duration),
          percent: 100 * state.position / state.duration,
          paused: false,
          position: state.position,
          duration: state.duration
        })
        clearInterval(this.interval);
        this.interval = setInterval(() => this.setState({ position: this.state.position + 1000 }), 1000);
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

  playPauseButton() {
    if (this.state.paused) {
      return <FaPlay size="1.6em" className="mx-4 mb-1" />
    }
    else {
      return <FaPause size="1.6em" className="mx-4 mb-1" />
    }
  }

  render() {
    let { imageURL, trackName, artists, currentTime, totalTime, percent, paused, position, duration} = this.state;

    return (
      <Container className="p-0" fluid={true} style={containerStyle}>
        <Navbar fixed="top" bg="clear" variant="dark">
          <Nav className="mx-auto mt-3">

          </Nav>
        </Navbar>
        <Row className="w-100 h-100">
          <Col lg={4} md={6} sm={8} className="mx-auto my-auto">
            <img className="my-3" style={albumImage} src={imageURL} alt="logo" />
            <h3>{trackName}</h3>
            <h5 className="mb-3" style={grey}>{artists}</h5>

            <FaBackward size="1.6em" className="mb-1" />
            { this.playPauseButton() }

            <FaForward size="1.6em" className="mb-1" />

            <h5 style={left}>{getTime(position)}</h5>
            <h5 style={right}>{getTime(duration)}</h5>

            <div className="my-2" style={progressBar}>
              <div style={{
                background: "white",
                height: "100%",
                width: 100 * position / duration + "%",
                borderRadius: "inherit",
                transition: "width 1s ease",
              }}></div>
            </div>
          </Col>
          <Col lg={2} md={3} sm={4} className="m-0 p-5 h-100" style={{ background: "rgba(0, 0, 0, 0.5)", width: "100%", minWidth: "30em" }}>
            <div style={settingsDiv} className="p-2">
              <MdFullscreen size="1.8em" />
              <MdSearch size="1.6rem" className="mx-1" />
              <MdSettings size="1.6rem" />
            </div>
            HELLO THIIS IS THE TAB PANEL
        </Col>
        </Row>

        <Background url={this.state.imageURL} />
      </Container>
    )
  }
};

export default Host;