import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FaVolumeUp, FaVolumeMute} from 'react-icons/fa';
import './VolumeSlider.css';
import { setVolume, setPlayerState } from '../actions/roomActions';
import RepeatButton from './RepeatButton';
 
class VolumeSlider extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (event) => {
    let { setVolume, setPlayerState } = this.props;
    let volume = event.target.value;
    setPlayerState({
      volume: volume / 100
    })

    setVolume((volume / 100.0));
  }
  
  handleClick = () => {
//    let { volume } = this.props.room.playerState;
    let { setVolume } = this.props;

    setVolume(0);
    setPlayerState({
      volume: 0
    })
  }
 
  render() {
    let { volume } = this.props.room.playerState;
    return (
      <div className="volumeContainer">
        <button className="volumeButton" onClick={this.handleClick}>
        {(volume === 0) ? (
            <FaVolumeMute size='1.3rem' className='mx-2'/>
        ) : (
            <FaVolumeUp size='1.3rem' className='mx-2'/>
        )}
        </button>
        
        <input type="range" min="0" max="100" value={volume * 100} 
              className="volumeSlider" id="myRange" onChange={this.handleChange}/>
        <RepeatButton/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.spotify.player,
  room: state.room
})

export default connect(mapStateToProps, { setVolume, setPlayerState })(VolumeSlider);