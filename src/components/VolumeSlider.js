import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FaVolumeUp, FaVolumeMute} from 'react-icons/fa';
import './VolumeSlider.css';
 
class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      volume: 50,
      mute: false
    }
  }
 
  handleChange = (event) => {
    let volume = event.target.value;
    this.props.player.setVolume((volume / 100.0));
    this.setState({
      volume: event.target.value,
      mute: false
    })
  }
  
  handleClick = () => {
    let { volume, mute } = this.state;
    mute = !mute;

    this.props.player.setVolume((mute ? 0.0 : volume / 100.0));
    this.setState({
      mute: !this.state.mute
    })
  }
 
  render() {
    let { volume, mute } = this.state;
    return (
      <div className="volumeContainer">
        <button className="volumeButton" onClick={this.handleClick}>
        {(mute || volume === 0) ? (
            <FaVolumeMute size='1.3rem' className='mx-2'/>
        ) : (
            <FaVolumeUp size='1.3rem' className='mx-2'/>
        )}
        </button>
        <input type="range" min="0" max="100" value={mute ? 0 : volume} 
              className="volumeSlider" id="myRange" onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playbackState: state.playbackState,
  player: state.host.player,
})

export default connect(mapStateToProps, null)(VolumeSlider);