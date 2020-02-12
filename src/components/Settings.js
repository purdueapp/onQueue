import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

class Settings extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          owner: 'Tobi'
        }
      }



  render() {

    return <Container fluid className='mt-3'>
      <h3>Settings</h3>
      <hr style={{ backgroundColor: 'gray' }} />
      <Row className='text-left my-3'>
            <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>
                Host: {this.state.owner}
            </p>
      </Row>
    </Container>
  }
}
 export default (Settings);
