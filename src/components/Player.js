import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPlay, FaBackward, FaForward, FaPause } from 'react-icons/fa';
import VolumeSlider from '../components/VolumeSlider';
import { play, pause, next, previous, seek } from '../actions/roomActions';
import { setPlayerState } from '../actions/roomActions';
import './Player.css';

let albumImage = {
  boxShadow: '0 15px 30px 0 rgba(0, 0, 0, 0.5), 0 20px 40px 0 rgba(0, 0, 0, 0.5)',
  width: '100%'
};

function getTime(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

class Player extends Component {
  constructor(props) {
    super(props);

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
        lowQualityImageURL: playbackState.track_window.current_track.album.images[0].url
      }
    }
    else {
      playerState = {
        artists: 'Loading',
        imageURL: '',// 'https://i.scdn.co/image/ab67616d0000b273ce92f72ec851a37549dea19b',
        trackName: 'Loading',
        currentTime: getTime(102340),
        totalTime: getTime(432343),
        percent: 100 * 102340 / 432343,
        paused: true,
        position: 102340,
        duration: 432343,
        lowQualityImageURL: 'https://i.scdn.co/image/ab67616d0000b273ce92f72ec851a37549dea19b',
      }
    }

    this.state = playerState;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let { trackWindow, paused, duration, position } = this.props.room.playerState;
    let { play, pause, next, previous } = this.props;
    let { currentTrack } = trackWindow;

    let artists = currentTrack.artists.map(artist => artist.name).join(', ');
    let imageURL = currentTrack.album.images[0].url;
    let trackName = currentTrack.name;

    const handleChange = (event) => {
      let { setPlayerState, seek } = this.props;
      let newPosition = event.target.value;

      setPlayerState({ position: duration * newPosition / 100 });

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        seek(newPosition * duration / 100);
      }, 500);
    }

    return (
      <div className="p-3 mx-auto" style={{ maxWidth: '50vh', maxHeight: '50vh' }}>
        <img className='my-3' style={albumImage} src={imageURL} alt={`${trackName} Album Cover`} />
        <h3>{trackName}</h3>
        <h5 className='mb-3' style={{ color: 'lightGrey' }}>{artists}</h5>

        <h5 style={{ float: 'left' }}>{getTime(position)}</h5>
        <FaBackward size='1.4em' className='mb-1' onClick={previous} />
        { paused ?
          < FaPlay size='1.4em' className='mx-4 mb-1' onClick={play} />
          :
          <FaPause size='1.4em' className='mx-4 mb-1' onClick={pause} />
        }
        <FaForward size='1.4em' className='mb-1' onClick={next} />
        <h5 style={{ float: 'right' }}>{getTime(duration)}</h5>

        <input type="range" min="0" max="100" value={(100 * position / duration) ? (100 * position / duration) : 0}
          className="slider" id="myRange" onChange={handleChange} />
        <VolumeSlider />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spotify: state.spotify,
  player: state.spotify.player,
  playbackState: state.spotify.playbackState,
  trackWindow: state.spotify.trackWindow,
  room: state.room,
  socket: state.socket
})

const mapDispatchToProps = {
  play,
  pause,
  next,
  previous,
  seek,
  setPlayerState
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);