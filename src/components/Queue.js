import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { Container, Row, Col, Image } from 'react-bootstrap';


class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    }

    this.searchTracks = this.searchTracks.bind(this);
  }

  searchTracks() {
    let accessToken = new URLSearchParams(this.props.location.search).get('accessToken');
    console.log("accessToken: " + accessToken)
    let spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      redirectUri: 'http://data.cs.purdue.edu:7373/callback'
    });

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchTracks("housefires")
      .then(results => {
        this.setState({
          tracks: results.body.tracks.items
        })
      })
  }

  componentDidMount() {
    this.searchTracks();
  }

  render() {
    return <Container fluid className="mt-3">
      <h3>Queue</h3>
      <hr style={{backgroundColor: "gray"}} />

      {this.state.tracks.map(track => {
        return (
          <Row className="text-left my-3">
            <Col md={4}>
              <Image fluid src={track.album.images[0].url} />
            </Col>
            <Col md={8}>
              <p>
                {track.name}<br />
                <span style={{ color: "grey" }}>{track.artists.map(artist => artist.name).join(', ')}</span>
              </p>
            </Col>
          </Row>
        )
      })}
    </Container>
  }
}

export default Queue;