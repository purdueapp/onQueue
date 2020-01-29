import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';
let SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: 'http://data.cs.purdue.edu:7373/callback'
});


class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined
    }

    this.fetchTokens = this.fetchTokens.bind(this);
  }

  componentDidMount() {
    console.log('hello');
    this.fetchTokens();
  }

  fetchTokens() {
    let code = new URLSearchParams(this.props.location.search).get('code');
    let redirectURI = 'http://data.cs.purdue.edu:7373/callback';
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        'code': code,
        'redirect_uri': redirectURI,
        'grant_type': 'authorization_code'
      })
    })
      .then(res => { console.log(res); return res.json() })
      .then(tokens => {
        this.setState({
          tokens: tokens
        })
        console.log(tokens)
      })

  }

  render() {
    // Setup some stuff
    if (this.state.tokens === undefined) {
      return <div />
    }
    return <Redirect to={`/host/tobi?accessToken=${this.state.tokens.access_token}`} />
  }
};

export default Callback;