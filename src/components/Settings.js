import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import RoomType from './Options/RoomType';
import NewUserType from './Options/NewUserType';
import MaxSongsDJ from './Options/MaxSongsDJ';
import MaxSongsQueue from './Options/MaxSongsQueue';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostDisplayName: 'Tobi',
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
        hostImage: res.images[0].url
      });
    })
  }

  render() {

    return <Container fluid className='mt-3'>
      <h3>Settings</h3>
      <hr style={{ backgroundColor: 'gray' }} />
      <Row>
        <p className='mt-1' style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
          <img src={this.state.hostImage} />
          <b>Host: </b> {this.state.hostDisplayName}
        </p>
      </Row>
      <RoomType />
      <NewUserType />
      <MaxSongsDJ />
      <MaxSongsQueue />
      <Row>
        <Col className='px-0' align='left'>
          <Link to="/" className="btn ptn-pill btn-sm" type="button" style={{
            color: "#fff",
            background: "#6C757D",
            borderColor: "#6C757D"

          }}>Logout</Link>
          {/* 
            <button className="btn-pill btn-sm" type="button" align='left'
              style={{
                color:"#fff",
                background: "#6C757D",
                borderColor: "#6C757D"

              }}>Logout</button>
              */}
        </Col>
        <Col className='px-0' align='right'>
          <button type="button" className="btn-pill btn-sm " align='right' style={{
            color: "#fff",
            background: "#6C757D",
            borderColor: "#6C757D"

          }}>Close Room</button>
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
