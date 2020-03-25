import React, { Component } from 'react';
import { connect } from 'react-redux';
//import SpotifyWebApi from 'spotify-web-api-node';
import { Container, FormControl } from 'react-bootstrap';
import { getAccessToken } from '../actions/authActions';
import Track from './SearchTrack';

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
    let { spotifyApi } = this.props;
    if (!spotifyApi.searchTracks) {
      return;
    }

    spotifyApi.searchTracks(query, (err, res) => {
      this.setState({
        tracks: res.tracks.items
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
        className="mb-3"
        style={{ backgroundColor: 'inherit', borderRadius: '1em', height: '2em', color: 'white' }}
        onChange={this.handleChangeQuery}
        id='query'
      />

<<<<<<< HEAD
      {this.state.tracks.map((track, key) => {
        return (
          <Track track={track} key={key}/>
=======
      {this.state.tracks.map((track, id) => {
        return (
          <Track key={id} track={track} />
>>>>>>> c6734c3913031c36a15ab313129f3569f6274da4
        )
      })}
    </Container>
  }
}


const mapStateToProps = state => ({
  spotifyApi: state.spotifyApi
})

export default connect(mapStateToProps, { getAccessToken })(Search);