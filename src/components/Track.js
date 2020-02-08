import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class Tracks extends Component {
  render() {
    let { track } = this.props;

    return (
      <Row className='text-left my-3'>
        <Col md={4}>
          <Image fluid src={track.album.images[0].url} />
        </Col>
        <Col md={8}>
          <p className='mt-1' style={{/*whiteSpace: 'nowrap',*/ overflow: 'auto' }}>
            {track.name}<br />
            <span style={{ color: 'grey', /*whiteSpace: 'nowrap',*/ overflow: 'auto' }}>{track.artists.map(artist => artist.name).join(', ')}</span>
          </p>
        </Col>
      </Row>
    )
  }
}

export default Tracks;