import React, { Component } from 'react';
import { connect } from 'react-redux';
import Blur from 'react-blur';
import './Background.css';

let backgroundStyle = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  zIndex: '-2',
  left: '0vw',
  top: '0vh',
  filter: 'brightness(60%)',
  background: 'black',
  overflow: 'hidden',
};

class Background extends Component {
  render() {
    let url = this.props.room.playerState.trackWindow.currentTrack.album.images[0].url;

    return (
      <Blur style={backgroundStyle} img={url} blurRadius={90} enableStyles />
    )
  }
}

let mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps)(Background);