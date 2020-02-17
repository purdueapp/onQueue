import React, { Component } from 'react';
import {Col, Button, ButtonGroup} from 'react-bootstrap';

class NewUserType extends Component{
    constructor(props) {
            super(props);
        this.state = {
          type: "DJ"
        }
    } 

    render(){
        return(
        <div className='text-left my-3'>
            <Col>
                <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>New User Role</p>
            </Col>
            <div align='right'>
                <Col>
                <ButtonGroup aria-label="user types">
                    <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'Admin'})}}>Admin</Button>
                     <Button variant="secondary" size='sm' onClick={() => {this.setState({ type: 'DJ'})}}>DJ</Button>
                     <Button variant="secondary" size='sm' onClick={() => {this.setState({ typer: 'Listener'})}}> Listener</Button>
                </ButtonGroup>
                </Col>
            </div>
        </div>
        )
    }
    
}
export default NewUserType;