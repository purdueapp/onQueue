import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Media from 'react-bootstrap/Media';

class Tracks extends Component {
  render() {
    let { track } = this.props;

    return (
      <Media >
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

export default Tracks;