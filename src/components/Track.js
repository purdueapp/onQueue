import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Media from 'react-bootstrap/Media';
import { MdPlaylistAdd } from 'react-icons/md';
import { queue, remove } from '../actions/roomActions';
import { TiDeleteOutline } from 'react-icons/ti';
import LikeButton from './LikeButton';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.hoverIcon = this.hoverIcon.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.addtoQueue = this.addtoQueue.bind(this);
  }

  hoverOn() {
    this.setState({ hover: true });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  addtoQueue() {
    let { type, queue, track } = this.props;

    if (type === 'search') {
      queue(track);
    }
  }

  deleteTrack() {
    let { remove, track } = this.props;

    remove(track);
  }

  hoverIcon() {
    let { hover } = this.state;
    let { type } = this.props;

   /* if (!hover) {
      return <Fragment />
    }*/
    if (type === 'search') {
      if (!hover) {
        return (
          <MdPlaylistAdd size={25} className='my-2 mx-0' align='center' style={{opacity:"0"}}/>
        )
      }
      return (
        <MdPlaylistAdd size={25} className='my-2 mx-0' align='center' onClick={this.addtoQueue} style={{opacity:".8"}}/>
      )
    }
    else if (type === 'nextTrack') {
      if (!hover) {
        return (
          <TiDeleteOutline className='my-1' size={25} color='grey' style={{cursor: 'pointer', opacity:"0"}}/>
        )
      }
      return (
          <TiDeleteOutline className='my-1' size={25} color='grey' style={{cursor: 'pointer', opacity:".8"}} onClick={this.deleteTrack}/>
      )
    }
  }

  userQueued(){
    let { hover } = this.state;
    let { type } = this.props;

    if (!hover) {
      return <Fragment />
    }
    if (type === 'nextTrack') {
      return (
           <span style={{ color: 'grey', overflow: 'auto', whiteSpace: 'nowrap', fontSize: '14px' }}>{this.props.queuedBy}</span>
      )
    }
  }

  likeSong(){
    let { type } = this.props;

   if (type === 'nextTrack') {
      return (
        <LikeButton className='my-1'/>
      )
    }
  }

  render() {
    let { track } = this.props;
    let { hover } = this.state;

    return (
      <Media
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
        className="pl-2"
        style={{ background: hover ? '#AAAAAA20' : '#00000000' }}
      >
        <img
          width={48}
          height={48}
          className="mr-3 my-2"
          src={track.album.images[0].url}
          alt="Generic placeholder"
        />
        <Media.Body>

          <p className='mt-1 text-center' style={{ overflow: 'auto' }}>
            {track.name}<br />
            <span style={{ color: 'grey', overflow: 'auto', display: 'block' }}>{track.artists.map(artist => artist.name).join(', ')}</span>
            {this.userQueued()}
          </p>

        </Media.Body>
        {this.likeSong()}
        {this.hoverIcon()}
        
      </Media >
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  nextTracks: state.spotify.trackWindow.nextTracks,
  socket: state.socket,
  type: ownProps.type,
  key: ownProps.key,
  track: ownProps.track
})

const mapDispatchToProps = {
  queue,
  remove
}

export default connect(mapStateToProps, mapDispatchToProps )(Track);