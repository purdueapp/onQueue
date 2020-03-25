import React, { Component } from 'react';
import { connect } from 'react-redux';
import Media from 'react-bootstrap/Media';
import { MdPlaylistAdd } from 'react-icons/md';
import { setNextTracks } from '../actions/queueActions';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.addtoQueue = this.addtoQueue.bind(this);
  }

  addtoQueue(){

  }

  hoverOn() {
    this.setState({ hover: true });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  playTrack() {
    if (this.props.spotifyApi && this.props.queue) {
      let { nextTracks } = this.props.queue;
      nextTracks.push(this.props.track);

      this.props.setNextTracks(nextTracks);
      /*
      this.props.spotifyApi.play({uris: [this.props.track.uri, 'spotify:track:7cvTBgG2OFDvY2pIl3WN9C']}, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
      */
    }
  }

  render() {
    let { track } = this.props;
    let { hover } = this.state;

    return (
      <Media
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
        onClick={this.playTrack}
        className="px-3"
        style={{background: hover ? '#AAAAAA20' : '#00000000'}}
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
          </p>
        </Media.Body>
        {this.state.hover && <MdPlaylistAdd size={25} className='my-2' align='center' onClick={this.addtoQueue}/>}
        </Media >
    )
  }
}

const mapStateToProps = state => ({
  player: state.player,
  spotifyApi: state.spotifyApi,
  queue: state.queue
})

export default connect(mapStateToProps, { setNextTracks })(Track);