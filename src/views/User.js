import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import { setupUserSocket } from '../actions/socketActions';
import { setPlayerState } from '../actions/roomActions';

let containerStyle = {
  textAlign: 'center',
  //  backgroundColor: '#19141488',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 1
};

let sideBarStyle = {
  background: 'rgba(0, 0, 0, 0.3)',
  width: '100%',
  minWidth: '24em'
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      mobile: window.innerWidth <= 768,
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    let { socket, setupUserSocket } = this.props;
    let roomID = window.location.pathname.substr(1);
    console.log(roomID);
    setupUserSocket(socket);
    socket.connect();
    socket.emit('join room', {
      roomID: roomID
    })
  }

  componentWillUnmount() {
    let { socket } = this.props;
    socket.close();
  }

  resize() {
    let currentMobile = (window.innerWidth <= 768);
    if (currentMobile !== this.state.hidePlayer) {
      this.setState({ mobile: currentMobile });
    }
  }

  render() {
    let { mobile } = this.state;

    return (
      <Container className='p-0 m-0 w-100' fluid style={containerStyle}>
        <Navbar fixed='top' bg='clear' variant='dark'>
          <Nav className='mx-auto mt-3'>

          </Nav>
        </Navbar>
        <Row className='w-100 h-100'>
          {mobile ?
            (
              <Col md={12} className='m-0 px-3 py-4 h-100' style={sideBarStyle}>
                <Sidebar />
              </Col>
            )
            :
            (
              <>
                <Col lg={4} md={6} sm={8} className='mx-auto my-auto'>
                  <Player />
                </Col>
                <Col lg={2} md={3} sm={4} className='m-0 px-5 py-4 h-100' style={sideBarStyle}>
                  <Sidebar />
                </Col>
              </>
            )
          }
        </Row>
      </Container>
    )
  }
};

const mapStateToProps = state => ({
  socket: state.socket
})

const mapDispatchToProps = {
  setPlayerState,
  setupUserSocket
}

export default connect(mapStateToProps, mapDispatchToProps)(User);