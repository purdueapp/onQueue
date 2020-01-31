import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FaPlay, FaBackward, FaForward, FaPause } from 'react-icons/fa';
import Background from './Background';

let progressBar = {
  position: 'relative',
  height: '0.5em',
  width: '100%',
  borderRadius: '3em',
  backgroundColor: 'gray',
};

let progressBarFiller = {
  background: 'white',
  height: '100%',
  borderRadius: 'inherit',
  transition: 'width 1s ease',
};

let albumImage = {
  boxShadow: '0 15px 30px 0 rgba(0, 0, 0, 0.5), 0 20px 40px 0 rgba(0, 0, 0, 0.5)',
  width: '100%',
};

function getTime(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: 'Vertical Worship',
      imageURL: 'https://i.scdn.co/image/ab67616d0000b273ce92f72ec851a37549dea19b',
      trackName: 'Yes I Will',
      currentTime: getTime(102340),
      totalTime: getTime(432343),
      percent: 100 * 102340 / 432343,
      paused: true,
      position: 102340,
      duration: 432343
    }

    this.setPlayerState = this.setPlayerState.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    this.setPlayerState(nextProps.playbackState)
  }

  setPlayerState(playbackState) {
    let playerState = {};

    if (playbackState.track_window) {
      playerState = {
        artists: playbackState.track_window.current_track.artists.map(artist => artist.name).join(', '),
        imageURL: playbackState.track_window.current_track.album.images[playbackState.track_window.current_track.album.images.length - 1].url,
        trackName: playbackState.track_window.current_track.name,
        currentTime: getTime(playbackState.position),
        totalTime: getTime(playbackState.duration),
        percent: 100 * playbackState.position / playbackState.duration,
        paused: playbackState.paused,
        position: playbackState.position,
        duration: playbackState.duration
      }
    }
    else {
      playerState = {
        artists: 'Vertical Worship',
        imageURL: 'https://i.scdn.co/image/ab67616d0000b273ce92f72ec851a37549dea19b',
        trackName: 'Yes I Will',
        currentTime: getTime(102340),
        totalTime: getTime(432343),
        percent: 100 * 102340 / 432343,
        paused: true,
        position: 102340,
        duration: 432343
      }
    }

    this.setState(playerState);

    clearInterval(this.interval);
    if (!playerState.paused) {
      this.interval = setInterval(() => this.setState({ position: this.state.position + 1000 }), 1000);
    }
  }

  playbackButtons() {
    if (this.state.paused) {
      return (
        <Fragment>
          <FaBackward size='1.4em' className='mb-1' />
          <FaPlay size='1.4em' className='mx-4 mb-1' />
          <FaForward size='1.4em' className='mb-1' />
        </ Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <FaBackward size='1.4em' className='mb-1' />
          <FaPause size='1.4em' className='mx-4 mb-1' />
          <FaForward size='1.4em' className='mb-1' />
        </ Fragment>
      )
    }
  }

  render() {
    let { imageURL, trackName, artists, position, duration } = this.state;

    return (
      <div>
        <img className='my-3' style={albumImage} src={imageURL} alt='logo' />
        <h3>{trackName}</h3>
        <h5 className='mb-3' style={{ color: 'lightGrey' }}>{artists}</h5>

        <h5 style={{ float: 'left' }}>{getTime(position)}</h5>
        {this.playbackButtons()}
        <h5 style={{ float: 'right' }}>{getTime(duration)}</h5>

        <div className='my-2' style={progressBar}>
          <div style={{ ...progressBarFiller, width: `${100 * position / duration}%` }}></div>
        </div>
        <Background imageURL={imageURL} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playbackState: state.playbackState
})

export default connect(mapStateToProps, null)(Player);