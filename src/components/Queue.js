import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Track from './Track';

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    }

    this.setQueueState = this.setQueueState.bind(this);
  }

  componentDidMount() {
    this.setQueueState(this.props.playbackState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playbackState === this.props.playbackState) {
      return;
    }

    this.setQueueState(this.props.playbackState);
  }

  setQueueState(playbackState) {
    if (playbackState.track_window) {
      this.setState({
        tracks: playbackState.track_window.next_tracks
      })
    }
  }

  render() {
    let { tracks } = this.state;

    return <Container fluid className='mt-3'>
      <h3>Queue</h3>
      <hr style={{ backgroundColor: 'gray' }} />

      {tracks.map((track, index) => {
        return (
          <Track key={index} track={track} />
        )
      })}
    </Container>
  }
}

const mapStateToProps = state => ({
  playbackState: state.playbackState
})

export default connect(mapStateToProps, null)(Queue);