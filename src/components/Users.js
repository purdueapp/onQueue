import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

class Settings extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          users: [],
        }
      }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {

    return <Container fluid className='mt-3'>
      <h3>Users</h3>
      <hr style={{ backgroundColor: 'gray' }} />
    </Container>
  }
}
 export default (Settings);
