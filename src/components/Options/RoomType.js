import React, { Component } from 'react';
import {Col, Button, ButtonGroup} from 'react-bootstrap';

class RoomType extends Component{
    constructor(props) {
        super(props);
    this.state = {
      type: "Public"
    }
} 

    render(){
        return(
        <div className='text-left my-3'>
            <Col>
            <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>Room Type</p>
            </Col>
            <div align='right'>
                <Col>
                <ButtonGroup aria-label="Room types">
                     <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Public'})}}>Public</Button>
                     <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Private'})}}> Private</Button>
                </ButtonGroup>
                </Col>
            </div>
        </div>
        )
    }
}

export default RoomType;