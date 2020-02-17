import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import RoomType from './Options/RoomType';
import NewUserType from './Options/NewUserType';
import MaxSongsDJ from './Options/MaxSongsDJ';

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
      <div className='text-left my-3'>
            <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>
                <b>Host: </b> {this.state.owner}
            </p>
      </div>
      <Row>
        <RoomType/>
      </Row>
      <Row>
        <NewUserType/>
      </Row>
      <Row>
        <MaxSongsDJ/>
      </Row>
      {/*<Row className='text-left my-3'>
            <Col>
              <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>Max Songs In Queue</p>
            </Col>
            <div align='right'>
              <Col>
              
                
              </Col>
            </div>
            <div align='right'>
          </div>
      </Row>
      <div align='left' margin='10px'>
          <button button class="btn btn-secondary btn-sm" type="button" class="btn btn-light">Logout</button>
      </div>
      <div align='left'>
        <button type="button" class="btn btn-light">Close Room</button>
  </div>*/}

    </Container>
  }
}
 export default (Settings);
