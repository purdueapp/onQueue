import './RepeatButton.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {MdRepeat, MdRepeatOne, MdTransferWithinAStation} from 'react-icons/md';
//import { setPlayerState } from '../actions/spotifyActions';
import { setRepeat } from '../actions/roomActions';
import { FaRProject } from 'react-icons/fa';

class RepeatButton extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      repeat: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let { setRepeat } = this.props;
    let { repeat } = this.props.room.playerState;

    setRepeat(!repeat);
  }
 
  render() {
    let { repeat } = this.props.room.playerState;
    return (
        <button className="repeatButton" onClick={this.handleClick}>
            {repeat ? (
                <MdRepeat size='1.3em' className='mx-2' style={{ color: '#00e859'}} />
            ) : (
                <MdRepeat size='1.3em' className='mx-2' />
            )}
        </button>
    )
  }
}

const mapStateToProps = state => ({
  player: state.spotify.player,
  room: state.room
})

export default connect(mapStateToProps, { setRepeat })(RepeatButton);