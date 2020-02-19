import { SET_STATE } from '../actions/playbackStateActions';

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
      
      cb(accessToken);
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
    console.log('hello')

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
  console.log('we in bois:' + accessToken);

  dispatch({
    type: SET_PLAYER,
    payload: player
  })
}