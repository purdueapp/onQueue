import './RepeatButton.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {MdRepeat, MdRepeatOne} from 'react-icons/md';
 
class RepeatButton extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      repeat: false
    }
  }

  handleClick = () => {
    let { repeat } = this.state;
    repeat = !repeat;
    this.setState({
        repeat: !this.state.repeat
      })

  }
 
  render() {
    let {repeat} = this.state;
    return (
        <button className="repeatButton" onClick={this.handleClick}>
            {(repeat === 1) ? (
                <MdRepeatOne size='1.3em' className='mx-2'/>
            ) : (
                <MdRepeat size='1.3em' className='mx-2' />
            )}
        </button>
    )
  }
}

const mapStateToProps = state => ({
  player: state.spotify.player,
})

export default connect(mapStateToProps, null)(RepeatButton);