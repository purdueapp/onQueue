
import React, { Component } from 'react';
import {Col, Row, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { connect } from 'react-redux';

class RoomType extends Component{

  handleChange = (value) => {

    let isPrivate = this.props.room.settings.private;

    console.log("From:" + isPrivate);
    console.log("To:" + value);

    let { socket } = this.props;
    socket.emit('update', {
      type: 'settings',
      settings: {
        private: value
      }
    })
  }

  render(){
    let isPrivate = this.props.room.settings.private;

    return(
      <Row className = 'my-2'>
        <Col align='left'>
          <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto', fontSize:'10' }}>Room Type</p>
        </Col>
        <Col align='right'>
          <ToggleButtonGroup aria-label="Room types" type="radio" name="options" defaultValue={isPrivate} onChange={this.handleChange}>
              <ToggleButton value={false} variant="secondary" size='sm'>Public</ToggleButton>
              <ToggleButton value={true} variant="secondary" size='sm'> Private</ToggleButton>
          </ToggleButtonGroup>
        </Col>        
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room,
  socket: state.socket
})

export default connect(mapStateToProps, null)(RoomType);