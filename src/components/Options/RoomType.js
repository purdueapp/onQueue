import React, { Component } from 'react';
import {Col, Row, Button, ButtonGroup} from 'react-bootstrap';

class RoomType extends Component{
    constructor(props) {
        super(props);
    this.state = {
      type: "Public"
    }
} 

    render(){
        return(
            <Row className = 'my-2'>
                <Col align='left'>
                    <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto', fontSize:'10' }}>Room Type</p>
                </Col>
                <Col align='right'>
                    <ButtonGroup aria-label="Room types">
                        <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Public'})}}>Public</Button>
                        <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Private'})}}> Private</Button>
                    </ButtonGroup>
                </Col>        
            </Row>
        )
    }
}

export default RoomType;