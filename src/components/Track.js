import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Media from 'react-bootstrap/Media';
import { MdPlaylistAdd } from 'react-icons/md';
import { queueTrack } from '../actions/spotifyActions';
import { TiDeleteOutline } from 'react-icons/ti';

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
    let { type } = this.props;

    if (type === 'search') {
      let { nextTracks, queueTrack } = this.props;
  
      queueTrack(this.props.track);
    }
  }

  deleteTrack(){

  }

  hoverIcon() {
    let { hover } = this.state;
    let { type } = this.props;

    if (!hover) {
      return <Fragment />
    }
    if (type === 'search') {
      return (
        <MdPlaylistAdd size={25} className='my-2' align='center' onClick={this.addtoQueue} />
      )
    }
    else if (type === 'nextTrack') {
      return (
        <TiDeleteOutline className='my-2' size={25} color='grey' style={{cursor: 'pointer'}} onClick={this.state.deleteTrack}/>
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
        className="px-3"
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
            <span style={{ color: 'grey', overflow: 'auto' }}>{track.artists.map(artist => artist.name).join(', ')}</span>
            {/* this.state.hover && <span style={{ color: 'grey', overflow: 'auto' }}>Queued by: User1</span> */}

          </p>
        </Media.Body>
        {this.hoverIcon()}
      </Media >
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  nextTracks: state.spotify.trackWindow.nextTracks,
  type: ownProps.type,
  key: ownProps.key,
  track: ownProps.track
})

export default connect(mapStateToProps, { queueTrack })(Track);