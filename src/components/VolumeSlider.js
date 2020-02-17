import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import {FaVolumeUp, FaVolumeOff, FaVolumeMute} from 'react-icons/fa';
 
class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      volume: 0,
      mute: false
    }
  }
 
  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
  }
 
  render() {
    let { volume } = this.state
    return (
      <div>
        <div><FaVolumeMute size='1.3rem' className='mx-2'/>
        <FaVolumeUp size='1.3rem' className='mx-2'/> <FaVolumeOff size='1.3rem' className='mx-2'/></div>
        <Slider
          value={volume}
          orientation="vertical"
          onChange={this.handleOnChange}
        />
      </div>
    )
  }
} export default VolumeSlider