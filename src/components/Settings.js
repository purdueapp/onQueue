import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import RoomType from './Options/RoomType';
import NewUserType from './Options/NewUserType';
import MaxSongsDJ from './Options/MaxSongsDJ';
import MaxSongsQueue from './Options/MaxSongsQueue';

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
      <Row>
              <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>
                  <b>Host: </b> {this.state.owner}
              </p>
      </Row>
      <RoomType/>
      <NewUserType/>
      <MaxSongsDJ/>
      <MaxSongsQueue/>
      <Row>
        <Col className = 'px-0' align='left'>
            <button className="btn-pill btn-sm" type="button" align='left'
              style={{
                color:"#fff",
                background: "#6C757D",
                borderColor: "#6C757D"

              }}>Logout</button>
        </Col>
        <Col className = 'px-0' align='right'>
            <button type="button" className="btn-pill btn-sm " align='right'style={{
                color:"#fff",
                background: "#6C757D",
                borderColor: "#6C757D"

              }}>Close Room</button>
        </Col>       
      </Row>

    </Container>
  }
}
 export default (Settings);
