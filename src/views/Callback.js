import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setTokens, getAccessToken } from '../actions/hostActions';
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
    // Setup some stuff

    // if (this.state.tokens === null || this.props.getAccessToken() === null) {
    if (this.props.host.tokens.refreshToken === undefined) {
      console.log(this.props.host.tokens);
      return <div />
    }
    console.log('redirecting to host')
    
    return <Redirect to={`/host/tobi`} />
  }
};

const mapStateToProps = state => ({
  tokens: state.host.tokens,
  host: state.host
})

export default connect(mapStateToProps, { setTokens, getAccessToken })(Callback);