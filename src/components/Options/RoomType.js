import React, { Component } from 'react';
import {Col, Row, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { connect } from 'react-redux';

class RoomType extends Component{

  handleChange = (value) => {
    let { socket } = this.props;
    socket.emit('update', {
      type: 'settings',
      settings: {
        private: value
      }
    })
  }

  setType(){
    let isPrivate = this.props.room.settings.private;
      //if(this.props.user.role === 'Admin'){
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
      /*}else{
        return <Fragment/>
      }*/
  }



  render(){
    return(
      <div>
        {this.setType()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
  user: state.user,
})

export default connect(mapStateToProps, null)(RoomType);