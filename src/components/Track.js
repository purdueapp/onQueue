import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import Media from 'react-bootstrap/Media';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.playTrack = this.playTrack.bind(this);
  }

  hoverOn() {
    this.setState({ hover: true });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  playTrack() {
    if (this.props.spotifyApi) {
      this.props.spotifyApi.play({uris: [this.props.track.uri]}, (err, res) => {

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
          width={64}
          height={64}
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
      </Media >
    )
  }
}

const mapStateToProps = state => ({
  player: state.player,
  spotifyApi: state.spotifyApi
})

export default connect(mapStateToProps, null)(Track);