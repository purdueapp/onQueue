import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAccessToken, setRefreshToken, getAccessToken } from '../actions/authActions';
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
      .then(tokens => {
        this.props.setAccessToken(tokens.access_token);
        this.props.setRefreshToken(tokens.refresh_token);
        console.log(this.props.getAccessToken());
        this.setState({
          tokens: tokens
        })
      })
  }

  render() {
    // Setup some stuff
    if (this.state.tokens === null) {
      return <div />
    }
    return <Redirect to={`/host/tobi`} />
  }
};

export default connect(null, { setAccessToken, setRefreshToken, getAccessToken })(Callback);