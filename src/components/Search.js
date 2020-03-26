import React, { Component } from 'react';
import { connect } from 'react-redux';
//import SpotifyWebApi from 'spotify-web-api-node';
import { Container, FormControl } from 'react-bootstrap';
import { getAccessToken } from '../actions/spotifyActions';
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
    let { api } = this.props;
    if (!api.searchTracks) {
      return;
    }

    api.searchTracks(query, (err, res) => {
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

      <div style={{ overflowY: 'scroll', display: 'inline-block'}}>
      {this.state.tracks.map((track, key) => {
        return (
          <Track track={track} type="search" key={key}/>
        )
      })}
      </div>

    </Container>
  }
}


const mapStateToProps = state => ({
  api: state.spotify.api
})

export default connect(mapStateToProps, { getAccessToken })(Search);