import React, { Component } from 'react';
import {Col, Row, Button, ButtonGroup} from 'react-bootstrap';
import { connect } from 'react-redux';

class NewUserType extends Component{
    constructor(props) {
        super(props);
        this.state = {
          type: "DJ",
          active: [false,true,false]
        }
    } 

    changeType = (e) => {
        //console.log("ccc" + e.target.innerHTML);
        let { socket } = this.props;
        socket.emit('update', {
          type: 'settings',
          settings: {
            defaultRole: e.target.innerHTML
          }
        })
        
    }

    render(){
        let role = this.props.room.settings.defaultRole;

        return(
        <Row className = 'my-2'>
            <Col align='left' className='pr-0'>
                <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>New User Role</p>
            </Col>
            <Col className ='pl-0' align='right'>
            <ButtonGroup aria-label="user types" toggle="true" type="radio" name="options" defaultValue={role}>
                <Button  variant="secondary" size='sm' onClick={this.changeType} >Admin</Button>
                <Button  variant="secondary" size='sm' onClick={this.changeType} > DJ</Button>
                <Button variant="secondary" size='sm' onClick={this.changeType} > Listener</Button>
            </ButtonGroup>
            </Col>
        </Row>
        )
    }
    
}
const mapStateToProps = state => ({
    room: state.room,
    socket: state.socket
  })
  
export default connect(mapStateToProps, null)(NewUserType);
