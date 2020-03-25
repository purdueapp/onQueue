import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Track from './Track';
import { FaHistory } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import { setNextTracks } from '../actions/spotifyActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TrackList = React.memo(function TrackList({ tracks }) {
  return tracks.map((track, index) => (
    <Draggable draggableId={track.id} index={index} key={track.id}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {<Track key={index} index={index} type="nextTrack" track={track} />}
        </div>
      )}
    </Draggable>
  ));
});

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: false,
      items: getItems(3)
    }

    this.historyClicked = this.historyClicked.bind(this);
    this.renderTracks = this.renderTracks.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    let { nextTracks } = this.props.spotify.trackWindow;
    let { setNextTracks } = this.props;

    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    nextTracks = reorder(
      nextTracks,
      result.source.index,
      result.destination.index
    )

    setNextTracks(nextTracks);
  }


  historyClicked() {
    this.setState(state => ({
      history: !state.history
    }));
  }

  renderTracks() {
    let { nextTracks, previousTracks } = this.props.spotify.trackWindow;
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
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TrackList tracks={nextTracks} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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

const mapStateToProps = state => {
  state.spotify.trackWindow.nextTracks = state.spotify.trackWindow.nextTracks.map((track, index) => {
    return {
      index: index.toString(),
      ...track
    }
  })
  return {
  spotify: state.spotify,
  trackWindow: state.spotify.trackWindow,
  //nextTracks: state.spotify.trackWindow.nextTracks
}}

export default connect(mapStateToProps, { setNextTracks })(Queue);