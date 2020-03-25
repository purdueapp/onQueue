import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Track from './QueuedTracks';
import { FaHistory } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import { nextTrack } from '../actions/hostActions';

let historyButton = {
  position: 'fixed',
  display: 'inline',
  right: '8%',
  top: '9.75%',
};

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextTracks: [],
      history: false
    }

    this.historyClicked = this.historyClicked.bind(this);
    this.renderTracks = this.renderTracks.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.queue === this.props.queue) {
      return;
    }

    if (this.props.queue) {
      this.setState({
        nextTracks: this.props.queue.nextTracks
      })
    }
  }

  historyClicked() {
    this.setState(state => ({
      history: !state.history
    }));
  }

  renderTracks() {
    let { nextTracks, previousTracks } = this.props;

    if (!nextTracks || !previousTracks) {
      return (<Fragment />)
    }

    if (this.state.history) {
      return (
        <Fragment>
          {previousTracks.map((track, index) => {
            return (
              <Track key={index} track={track} />
            )
          })}
        </Fragment>
      )
    }

    return (
      <Fragment>
        {nextTracks.map((track, index) => {
          return (
            <Track key={index} track={track} />
          )
        })}
      </Fragment>
    )
  }

  render() {
    return <Container fluid className='mt-3'>
      <div>
        <h3 align='center' className='w-80 d-inline'>{this.state.history ? 'History' : 'Queue'}</h3>
        <div style={historyButton}>
          {this.state.history ? (<MdQueueMusic onClick={this.historyClicked} />) : (<FaHistory onClick={this.historyClicked} />)}
        </div>
      </div>
      <hr style={{ backgroundColor: 'gray' }} />

      {this.renderTracks()}
    </Container>
  }
}

const mapStateToProps = state => ({
  previousTracks: state.host.previousTracks,
  nextTracks: state.host.nextTracks,
  playbackState: state.host.playbackState,
})

export default connect(mapStateToProps, null)(Queue);