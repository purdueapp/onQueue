import { SET_STATE } from '../actions/playbackStateActions';
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from './authActions';
import { SET_SPOTIFY_API_ACCESS_TOKEN } from './spotifyApiActions';
import qs from 'qs';

export const SET_PLAYER = 'SET_PLAYER';
export const CLEAR_PLAYER = 'CLEAR_PLAYER';


function setDevice(deviceId, accessToken) {
  fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play: true,
    }),
  });
}

export const setPlayer = (accessToken) => dispatch => {
  let player = new window.Spotify.Player({
    name: 'onQueue Player',

    getOAuthToken: cb => {
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refreshToken'),
        }),
      })
        .then(res => res.json())
        .then(tokens => {
          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: tokens.access_token
          })

          dispatch({
            type: SET_REFRESH_TOKEN,
            payload: tokens.refresh_token
          })

          dispatch({
            type: SET_SPOTIFY_API_ACCESS_TOKEN,
            payload: tokens.access_token
          })

          cb(accessToken);
        })
    },
    volume: 0.5
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => {
    if (state == null) {
      return;
    }

    // setPlaybackState(state);
    dispatch({
      type: SET_STATE,
      payload: state
    })
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    setDevice(device_id, accessToken);
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

  dispatch({
    type: SET_PLAYER,
    payload: player
  })
}