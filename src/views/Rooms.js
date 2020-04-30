import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import bg from '../images/bg.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import Room from '../components/Room';

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    }
  };

  componentDidMount() {
    let { socket } = this.props;

    socket.emit('rooms');
    socket.on('rooms', (rooms) => {
      this.setState({
        rooms: rooms
      })
    })
  }

  render() {
    let { rooms } = this.state;
    
    return (
      <div style={containerStyle}>
        <Button variant="link" style={back} href="/" >
          <FaArrowLeft /> Back
        </Button>
        <div className="list-group" style={listContainer}>
          {rooms.filter((room) => !room.isPrivate).map((room, index) => <Room key={index} room={room} />)}
        </div>

        <div style={backgroundStyle} />
      </div>
    )
  }
};

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps, {})(Rooms);

let listContainer = {
  minWidth: '50vw',
};

let back = {
  color: 'white',
  margin: '1em',
  position: 'absolute',
  top: '0',
  left: '0',
};

let containerStyle = {
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

let backgroundStyle = {
  background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + bg + ')',
  backgrounColor: 'rgba(0, 0, 0, 0.5)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  position: 'absolute',
  filter: 'blur(0.5em)',
  WebkitFilter: 'blur(0.7em)',
  transform: 'scale(1.2)',
  zIndex: '-1',
  transition: 'background ease 2s',
};