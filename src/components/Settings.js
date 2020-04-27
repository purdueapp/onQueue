import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import RoomType from './Options/RoomType';
import NewUserType from './Options/NewUserType';
import MaxSongsDJ from './Options/MaxSongsDJ';
import MaxSongsQueue from './Options/MaxSongsQueue';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Code from './Options/Code';
import "./Scroll.css";

let logout = {
  color: "#fff",
  background: "#6C757D",
  borderColor: "#6C757D",
}
let closeRoom = {
  color: "#fff",
  background: "#6C757D",
  borderColor: "#6C757D",
}

class Settings extends Component {

  submitlogout = () => {
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.logout()
        },
        {
          label: 'No'
        }
      ]
    });
  };

  logout = () => {

  }

  submitCloseRoom = () => {
    confirmAlert({
      title: 'Confirm to Close Room',
      message: 'Are you sure you want to close this room?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.closeRoom()
        },
        {
          label: 'No'
        }
      ]
    });
  };

  closeRoom = () => {

  }

  render() {
    let { host } = this.props.room;

    return <Container fluid id="style-1" className='mt-3 px-0' >
      <h3>Settings</h3>
      <hr style={{ backgroundColor: 'gray' }} />
        <div className="mb-5" id="style-1" style={{ height:'80vh', background: '#ffffff00', overflow:'scroll'}}>
          <Row>
            {/*
          <p className='mt-1' style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
            <b>Host: </b> {this.state.hostDisplayName}
            <img style={{ width: '26px', height: '26px', borderRadius: '13px', marginLeft: '5px' }} src={this.state.hostImage} />
          </p>
          */}
            <Col align='left' >
              <p className='py-3' style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
                <b>Host:  </b> {host.display_name}
              </p>
            </Col>
            <Col className='py-1' align='right'>
              <img height={60} width={60} style={{
                borderRadius: "1px",
              }}
                src={host.images ? host.images[0].url : ''}
                alt="profile pic" />
            </Col>
          </Row>
          <RoomType />
          <NewUserType />
          <MaxSongsDJ />
          <MaxSongsQueue />
          <Code hostID={host.id} />
          <Row>
            <Col align='left' >
              <button className="mt-5 mx-0 btn-pill btn-sm" type="button" align='left'
                style={logout}
                onClick={this.submitlogout}>
                Logout
              </button>
            </Col>
            <Col align='right' >
            <button type="button" className="mt-5 mx-0btn-pill btn-sm " align='right'
              style={closeRoom}
              onClick={this.submitCloseRoom}>
              Close Room
            </button>
            </Col>          
          </Row>
      </div>
    </Container>
  }
}

const mapStateToProps = state => ({
  api: state.spotify.api,
  room: state.room
})

export default connect(mapStateToProps, null)(Settings);
