import React, { Component } from 'react';
import { Row, Col} from 'react-bootstrap';

class User extends Component {

  render() {
    return (
      <Row className='text-left my-3'>
        <Col>
            <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>{this.props.user.name}</p>
        </Col>
        <div align='right'>
          <Col>
            <div class="btn-group">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.user.type}
            </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item">Admin</button>
                <button class="dropdown-item">DJ</button>
                <button class="dropdown-item">Listener</button>
              </div>
            </div>
          </Col>
        </div>
      </Row>
    )
  }
}

export default User;
