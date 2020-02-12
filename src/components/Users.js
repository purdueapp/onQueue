import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import User from './User';
import propTypes from "prop-types";

class Users extends Component {
    constructor(props) {
        super(props);
        //this.setType = this.setType.bind(this)
      }

  render() {
    return <Container fluid className='mt-3'>
      <h3>Users</h3>
      <hr style={{ backgroundColor: 'gray' }} />
      {this.props.users.map((item,key)=>
            <User user={item}/>
            )}
    </Container>
  }
}
Users.propTypes = {
  users: propTypes.array
}

Users.defaultProps = {
users:[
  {
  name: 'vivian',
  type: 'Admin'
  },
  {
  name:'tobi',
  type:'DJ'
  },
  {
  name:'youngsik',
  type:'Listener'
  }
]
};

export default (Users);