import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Track from './Track';
import { FaHistory } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import { reorder, setTrackWindow } from '../actions/roomActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Scroll.css';

const reorderAlgo = (list, startIndex, endIndex) => {
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
      history: false
    }

    this.historyClicked = this.historyClicked.bind(this);
    this.renderTracks = this.renderTracks.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  async onDragEnd(result) {
    let { reorder, room, setTrackWindow } = this.props;

    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    reorder(result.source.index, result.destination.index);
    setTrackWindow({
      nextTracks: reorderAlgo(room.playerState.trackWindow.nextTracks, result.source.index, result.destination.index)
    })
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
      <div className="mb-5" id="style-1" style={{ background: '#ffffff00', overflowY: 'scroll', height: '70vh'}}>
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
    return <Container fluid className='mt-3 px-2'>
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

const mapDispatchToProps = {
  reorder,
  setTrackWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue);