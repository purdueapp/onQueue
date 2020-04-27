import React, { Component } from 'react';
import {Col, Row, Button, ButtonGroup} from 'react-bootstrap';

class NewUserType extends Component{
    constructor(props) {
            super(props);
        this.state = {
          type: "DJ"
        }
    } 

    render(){
        return(
        <Row className = 'my-2'>
            <Col align='left' className='pr-0'>
                <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>New User Role</p>
            </Col>
            <Col className ='pl-0' align='right'>
            <ButtonGroup aria-label="user types">
                <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Admin'})}}>Admin</Button>
                    <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'DJ'})}}>DJ</Button>
                    <Button variant="secondary" size='sm' onClick={() => {this.setState({ typer: 'Listener'})}}> Listener</Button>
            </ButtonGroup>
            </Col>
        </Row>
        )
    }
    
}
export default NewUserType;