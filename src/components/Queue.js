import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Track from './Track';
import { FaHistory } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import { reorder } from '../actions/roomActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
      history: false
    }

    this.historyClicked = this.historyClicked.bind(this);
    this.renderTracks = this.renderTracks.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    let { reorder } = this.props;

    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    let { socket } = this.props;
    reorder(result.destination.index, result.source.index);
  }

  historyClicked() {
    this.setState(state => ({
      history: !state.history
    }));
  }

  renderTracks() {
    let { nextTracks, previousTracks } = this.props.room.playerState.trackWindow;
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
      <div className="mb-5" style={{ background: '#ffffff00', overflowX: 'scroll', overflowY: 'scroll', height: '70vh' }}>
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
      </div>
    )
  }

  render() {
    return <Container fluid className='mt-3'>
      <div>
        <h3 align='center' className='w-80'>
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
  room: state.room,
  socket: state.socket
})


export default connect(mapStateToProps, { reorder })(Queue);