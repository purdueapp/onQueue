import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FaPlay, FaBackward, FaForward, FaPause} from 'react-icons/fa';
import Background from './Background';
import VolumeSlider from '../components/VolumeSlider';
import './Player.css';

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

    this.playbackButtons = this.playbackButtons.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.previousTrack = this.previousTrack.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playbackState === this.props.playbackState) {
      return;
    }

    let { playbackState } = this.props;
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
        duration: playbackState.duration,
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

  play() {
    let { player } = this.props;
    if (player) {
      player.resume();
    }
  }

  pause() {
    let { player } = this.props;
    if (player) {
      player.pause();
    }
  }

  nextTrack() {
    let { player } = this.props;
    if (player) {
      player.nextTrack();
    }
  }

  previousTrack() {
    let { player } = this.props;
    if (player) {
      player.previousTrack();
    }
  }

  playbackButtons() {
    if (this.state.paused) {
      return (
        <Fragment>
          <FaBackward size='1.4em' className='mb-1' onClick={this.previousTrack} />
          <FaPlay size='1.4em' className='mx-4 mb-1' onClick={this.play} />
          <FaForward size='1.4em' className='mb-1' onClick={this.nextTrack} />
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <FaBackward size='1.4em' className='mb-1' onClick={this.previousTrack} />
          <FaPause size='1.4em' className='mx-4 mb-1' onClick={this.pause} />
          <FaForward size='1.4em' className='mb-1' onClick={this.nextTrack} />
        </Fragment>
      )
    }
  }

  render() {
    let { imageURL, trackName, artists, position, duration } = this.state;
    
    const handleChange = (event) => {
      let newPosition = event.target.value;
      if (this.props.player) {
        this.props.player.seek(newPosition * duration / 100);
        this.setState({position: duration * newPosition / 100});
      }
    }

    return (
      <div>
        <img className='my-3' style={albumImage} src={imageURL} alt='logo' />
        <h3>{trackName}</h3>
        <h5 className='mb-3' style={{ color: 'lightGrey' }}>{artists}</h5>

        <h5 style={{ float: 'left' }}>{getTime(position)}</h5>
        {this.playbackButtons()}
        <h5 style={{ float: 'right' }}>{getTime(duration)}</h5>

        <input type="range" min="0" max="100" value={100 * position / duration} 
              className="slider" id="myRange" onChange={handleChange}/>
        <Background imageURL={imageURL} />
        <VolumeSlider />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playbackState: state.playbackState,
  player: state.player,
  spotifyApi: state.spotifyApi
})

export default connect(mapStateToProps, null)(Player);