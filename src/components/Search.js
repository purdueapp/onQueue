import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import { Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';
import Track from './Track';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      query: ''
    }

    this.searchTracks = this.searchTracks.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
  }

  searchTracks(query) {
    let accessToken = new URLSearchParams(window.location.search).get('accessToken');
    console.log('accessToken: ' + accessToken)
    let spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      redirectUri: `${window.location.origin}/callback`
    });

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchTracks(query)
      .then(results => {
        this.setState({
          tracks: results.body.tracks.items
        })
      })
  }

  componentDidMount() {
    this.searchTracks('housefires');
  }

  handleChangeQuery(event) {
    event.persist();

    this.setState({
      query: event.target.value
    })

    clearTimeout(this.timeout);

    if (event.target.value) {
      this.timeout = setTimeout(() => {
        let query = event.target.value
        if (query !== '') {
          this.searchTracks(query);
        }
      }, 500);
    }
  }

  render() {
    let { query } = this.state;

    return <Container fluid className='mt-3'>
      <h3>Search</h3>

      <FormControl
        placeholder="Search For Tracks To Add Here"
        name="searchInput"
        value={query}
        style={{ backgroundColor: 'inherit', borderRadius: '1em', height: '2em' }}
        onChange={this.handleChangeQuery}
        id='query'
      />

      {this.state.tracks.map(track => {
        return (
          <Track track={track} />
        )
      })}
    </Container>
  }
}

/*
const mapStateToProps = state => ({
  playbackState: state.playbackState
})
*/

export default connect(null, null)(Search);