import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap';
import Track from './Track';
import {FaHistory} from 'react-icons/fa';
import {MdQueueMusic} from 'react-icons/md';

let historyButton ={
  position: 'fixed',
  display: 'inline',
  right: '8%',
  top: '9.75%',
};

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      history: false
    }

    this.setQueueState = this.setQueueState.bind(this);
    this.historyClicked = this.historyClicked.bind(this);
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
  
  historyClicked() {
    this.setState(state => ({
      history: !state.history
    }));
  }

  render() {
    let { tracks } = this.state;

    return <Container fluid className='mt-3'>
      <div>
      <h3 align='center' className='w-80 d-inline'>{this.state.history? 'History': 'Queue' }</h3>
      <div style={historyButton}>
          {this.state.history ? (<MdQueueMusic onClick={this.historyClicked}/>):(<FaHistory onClick={this.historyClicked}/>)}
      </div>
      </div>
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