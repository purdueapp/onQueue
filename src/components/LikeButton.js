import './LikeButton.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {IoMdHeart, IoMdHeartEmpty} from 'react-icons/io';
 
class LikeButton extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      liked: false
    }
  }

  handleClick = () => {
    let { liked } = this.state;
    liked = !liked;
    this.setState({
        liked: !this.state.liked
      })

  }
 
  render() {
    let {liked} = this.state;
    return (
        <button className="likeButton" onClick={this.handleClick}>
            {(liked === 1) ? (
                <IoMdHeart size='1.3em' className='mx-3'/>
            ) : (
                <IoMdHeartEmpty size='1.3em' className='mx-3' />
            )}
        </button>
    )
  }
}

const mapStateToProps = state => ({
  player: state.spotify.player,
})

export default connect(mapStateToProps, null)(LikeButton);