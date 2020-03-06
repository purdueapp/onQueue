import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import RoomType from './Options/RoomType';
import NewUserType from './Options/NewUserType';
import MaxSongsDJ from './Options/MaxSongsDJ';
import MaxSongsQueue from './Options/MaxSongsQueue';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostDisplayName: 'Tobi',
      hostImage: 'https://i.scdn.co/image/ab67616d0000b273e56c05d7ef8ffbd828d0bd40'
    }
    this.submitlogout = this.submitlogout.bind(this);
    this.submitCloseRoom = this.submitCloseRoom.bind(this);
    this.logout = this.logout.bind(this);
    this.closeRoom = this.closeRoom.bind(this);
  }

  componentDidMount() {
    this.props.spotifyApi.getMe((err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      this.setState({
        hostDisplayName: res.display_name,
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

  logout(){
    
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

  closeRoom(){

  }

  render() {

    return <Container fluid className='mt-3'>
      <h3>Settings</h3>
      <hr style={{ backgroundColor: 'gray' }} />
      <Row>
        <Col className='px-0 py-0' align='left' >
          <p className='mt-1 py-3' style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
            <b>Host:  </b> {this.state.hostDisplayName}
          </p>
        </Col>
        <Col className='px-0 py-1' align='right'>
          <img height={60} width={60} style={{
              borderRadius: "1px",
            }}
            src={this.state.hostImage} 
            alt="profile pic"/>  
        </Col>
      </Row>
      <RoomType />
      <NewUserType />
      <MaxSongsDJ />
      <MaxSongsQueue />
      <Row>
        <Col className='px-0' align='left'>
          {/*<Link to="/" className="btn ptn-pill btn-sm" type="button" style={{
            color: "#fff",
            background: "#6C757D",
            borderColor: "#6C757D"

          }}>Logout</Link>*/}
           
          <button className="btn-pill btn-sm" type="button" align='left'
              style={{
                color:"#fff",
                background: "#6C757D",
                borderColor: "#6C757D"

              }}
              onClick={this.submitlogout}>
              Logout
          </button>
        </Col>
        <Col className='px-0' align='right'>
          <button type="button" className="btn-pill btn-sm " align='right' style={{
            color: "#fff",
            background: "#6C757D",
            borderColor: "#6C757D"

          }}
          onClick={this.submitCloseRoom}>
          Close Room
          </button>
        </Col>
      </Row>

    </Container>
  }
}

const mapStateToProps = state => ({
  playbackState: state.playbackState,
  player: state.player,
  spotifyApi: state.spotifyApi
})

export default connect(mapStateToProps, null)(Settings);
