import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          users: ['vivian','tobi','youngsik']
        }
      }

  render() {
    return (
      <Row className='text-left my-3'>
        <Col>
            {this.state.users.map((item,key)=>
            <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>{item}</p>)}
        </Col>
      </Row>
    )
  }
}

export default User;