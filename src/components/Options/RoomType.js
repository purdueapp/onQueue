import React, { Component } from 'react';
<<<<<<< HEAD
import {Col, Row, ToggleButtonGroup, ToggleButton, Button, ButtonGroup} from 'react-bootstrap';
import { connect } from 'react-redux';

class RoomType extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleEvent = (e) => {
    let { socket } = this.props;
    socket.emit('update', {
      type: 'settings',
      settings: {
        private: false
      }
    })
  }

  render(){
    let { room } = this.props;
    console.log(room);
    return(
      <Row className = 'my-2'>
        <Col align='left'>
          <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto', fontSize:'10' }}>Room Type</p>
        </Col>
        <Col align='right'>
          {/* <ToggleButtonGroup aria-label="Room types" type="radio" defaultValue={"private"}>
              <ToggleButton value="public" variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Public'})}}>Public</ToggleButton>
              <ToggleButton value="private" variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Private'})}}> Private</ToggleButton>
          </ToggleButtonGroup> */}
        </Col>        
=======
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';

class RoomType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Public"
    }
  }

  render() {
    return (
      <Row className='my-2'>
        <Col align='left'>
          <p className='mt-1' style={{ whiteSpace: 'nowrap', overflow: 'auto', fontSize: '10' }}>Room Type</p>
        </Col>
        <Col align='right'>
          <ButtonGroup aria-label="Room types">
            <Button variant="secondary" size='sm' onClick={() => { this.setState({ type: 'Public' }) }}>Public</Button>
            <Button variant="secondary" size='sm' onClick={() => { this.setState({ type: 'Private' }) }}> Private</Button>
          </ButtonGroup>
        </Col>
>>>>>>> 531444d5a83e4739436000ac9df876bab1a6bf39
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room,
  socket: state.socket
})

export default connect(mapStateToProps, null)(RoomType);