import qs from 'qs';

export const SET_TOKENS = 'SET_TOKENS';
export const CLEAR_TOKENS = 'CLEAR_TOKENS';

export const SET_PLAYER = 'SET_PLAYER';
export const SET_PLAYBACK_STATE = 'SET_STATE';

export const NEXT_TRACK = 'NEXT_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';
export const SET_NEXT_TRACKS = 'SET_NEXT_TRACKS';

export const SIGNAL_TRACK = 'spotify:track:7cvTBgG2OFDvY2pIl3WN9C';
export const DEFAULT_TRACK = 'spotify:track:6gQEzbiJgaTxi4NiVdKjdW';

export const setTokens = (tokens) => dispatch => {
  dispatch({
    type: SET_TOKENS,
    payload: tokens
  })
}

export const clearTokens = () => dispatch => {
  dispatch({
    type: CLEAR_TOKENS
  })
}

export const getAccessToken = () => dispatch => {
  return localStorage.getItem('accessToken');
}

export const getRefreshToken = () => dispatch => {
  return localStorage.getItem('getRefreshToken');
}

export const setPlayer = () => dispatch => {
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
        .then(data => {
          let tokens = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token ? data.refresh_token : localStorage.getItem('refreshToken')
          };

          dispatch({
            type: SET_TOKENS,
            payload: tokens
          })

          cb(tokens.accessToken);
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
    dispatch({
      type: SET_PLAYBACK_STATE,
      payload: state
    });
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

export const setPlaybackState = (state) => dispatch => {
  dispatch({
    type: SET_PLAYBACK_STATE,
    payload: state
  })
}

export const nextTrack = () => dispatch => {
  dispatch({
    type: NEXT_TRACK
  })
}

export const previousTrack = () => dispatch => {
  dispatch({
    type: NEXT_TRACK
  })
}

export const setNextTracks = (nextTracks) => dispatch => {
  dispatch({
    type: SET_NEXT_TRACKS,
    payload: nextTracks
  })
}