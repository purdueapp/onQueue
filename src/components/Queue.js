import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Track from './Track';
import { FaHistory } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import { nextTrack } from '../actions/spotifyActions';

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
      history: false
    }

    this.historyClicked = this.historyClicked.bind(this);
    this.renderTracks = this.renderTracks.bind(this);
  }

  historyClicked() {
    this.setState(state => ({
      history: !state.history
    }));
  }

  renderTracks() {
    let { nextTracks, previousTracks } = this.props.trackWindow;
    let { history } = this.state;

    if (!nextTracks || !previousTracks) {
      return (<Fragment />)
    }

    if (history) {
      return (
        <Fragment>
          {previousTracks.slice(0).reverse().map((track, index) => {
            return (
              <Track key={index} type="search" track={track} />
            )
          })}
        </Fragment>
      )
    }

    return (
      <Fragment>
        {nextTracks.map((track, index) => {
          return (
            <Track key={index} type="nextTrack" track={track} />
          )
        })}
      </Fragment>
    )
  }

  render() {
    return <Container fluid className='mt-3'>
      <div>
        <h3 align='center' className='w-80 d-inline'>
          {this.state.history ? 'History' : 'Queue'}
          <span>
            &nbsp;
            {this.state.history ? (<MdQueueMusic onClick={this.historyClicked} />) : (<FaHistory onClick={this.historyClicked} />)}
          </span>
        </h3>
      </div>
      <hr style={{ backgroundColor: 'gray' }} />

      {this.renderTracks()}
    </Container>
  }
}

const mapStateToProps = state => ({
  trackWindow: state.spotify.trackWindow,
})

export default connect(mapStateToProps, null)(Queue);