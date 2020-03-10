import React, { Component } from 'react';
import { connect } from 'react-redux';
import Media from 'react-bootstrap/Media';
import { TiDeleteOutline } from 'react-icons/ti';


class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
  }

  hoverOn() {
    this.setState({ hover: true });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  deleteTrack(){

  }

  playTrack() {
    if (this.props.spotifyApi) {
      this.props.spotifyApi.play({uris: [this.props.track.uri]}, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
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
            {this.state.hover && <div><span style={{ color: 'grey', overflow: 'auto' }}>Queued by: User1</span></div>}
          </p>
        </Media.Body>
        {this.state.hover && <TiDeleteOutline className='my-2' size={25} color='grey' onClick={this.state.deleteTrack}/>}
        </Media >
    )
  }
}

const mapStateToProps = state => ({
  player: state.player,
  spotifyApi: state.spotifyApi
})

export default connect(mapStateToProps, null)(Track);