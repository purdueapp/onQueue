import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setTokens, getAccessToken } from '../actions/spotifyActions';
import qs from 'qs';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    }

    this.fetchTokens = this.fetchTokens.bind(this);
  }

  componentDidMount() {
    this.fetchTokens();
  }

  fetchTokens() {
    let code = new URLSearchParams(this.props.location.search).get('code');
    let redirectURI = `${window.location.origin}/callback`;
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
      .then(res => { return res.json() })
      .then(data => {
        let tokens = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token
        };

        this.props.setTokens(tokens);
      })
  }

  render() {
    if (this.props.spotify.tokens.refreshToken === undefined) {
      console.log(this.props.spotify.tokens);
      return <div />
    }
    
    return <Redirect to={`/host`} />
  }
};

const mapStateToProps = state => ({
  tokens: state.spotify.tokens,
  spotify: state.spotify,
  socket: state.socket
})

export default connect(mapStateToProps, { setTokens, getAccessToken })(Callback);