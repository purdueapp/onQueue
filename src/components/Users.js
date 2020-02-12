import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import User from './User';

class Users extends Component {
    constructor(props) {
        super(props);
      }

  render() {

    return <Container fluid className='mt-3'>
      <h3>Users</h3>
      <hr style={{ backgroundColor: 'gray' }} />
      <User/>
    </Container>
  }
}
 export default (Users);
