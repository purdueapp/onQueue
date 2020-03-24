import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import RoomType from './Options/RoomType';
import NewUserType from './Options/NewUserType';
import MaxSongsDJ from './Options/MaxSongsDJ';
import MaxSongsQueue from './Options/MaxSongsQueue';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Code from './Options/Code';

let logout = {
  color: "#fff",
  background: "#6C757D",
  borderColor: "#6C757D",
  position: "fixed",
  bottom: "10%",
  right: "19%"
}
let closeRoom = {
  color: "#fff",
  background: "#6C757D",
  borderColor: "#6C757D",
  position: "fixed",
  bottom: "10%",
  right: "3%"

}

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostDisplayName: 'Tobi',
      hostID: 'tobi',
      hostImage: 'https://i.scdn.co/image/ab67616d0000b273e56c05d7ef8ffbd828d0bd40'
    }
  }

  componentDidMount() {
    this.props.spotifyApi.getMe((err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      this.setState({
        hostDisplayName: res.display_name,
        hostID: res.id,
        hostImage: res.images[0].url
      });
    })
  }

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

    return <Container fluid className='mt-3'>
      <h3>Settings</h3>
      <hr style={{ backgroundColor: 'gray' }} />
      <Row>
        {/*
      <p className='mt-1' style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
        <b>Host: </b> {this.state.hostDisplayName}
        <img style={{ width: '26px', height: '26px', borderRadius: '13px', marginLeft: '5px' }} src={this.state.hostImage} />
      </p>
      */}
        <Col className='px-0 py-0' align='left' >
          <p className='mt-0 py-3' style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
            <b>Host:  </b> {this.state.hostDisplayName}
          </p>
        </Col>
        <Col className='px-0 py-1' align='right'>
          <img height={60} width={60} style={{
            borderRadius: "1px",
          }}
            src={this.state.hostImage}
            alt="profile pic" />
        </Col>
      </Row>
      <RoomType />
      <NewUserType />
      <MaxSongsDJ />
      <MaxSongsQueue />
      <Code hostID={this.state.hostID} />
      <button className="btn-pill btn-sm" type="button" align='left'
        style={logout}
        onClick={this.submitlogout}>
        Logout
      </button>
      <button type="button" className="btn-pill btn-sm " align='right'
        style={closeRoom}
        onClick={this.submitCloseRoom}>
        Close Room
      </button>

    </Container>
  }
}

const mapStateToProps = state => ({
  playbackState: state.playbackState,
  player: state.player,
  spotifyApi: state.spotifyApi
})

export default connect(mapStateToProps, null)(Settings);
