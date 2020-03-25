import SpotifyWebApi from 'spotify-web-api-js';
import { SIGNAL_TRACK, DEFAULT_TRACK } from '../constants';
import { CLEAR_TOKENS, SET_PLAYER, SET_PLAYBACK_STATE, NEXT_TRACK, PREVIOUS_TRACK, SET_TOKENS, SET_NEXT_TRACKS } from '../actions/hostActions';

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

let initialState = {
  player: undefined,
  nextTracks: [],
  previousTracks: [],
  currentTrack: {
    uri: DEFAULT_TRACK, // Spotify URI
    id: "5xW6Gs4ZKePJOZguvG6RV8",                // Spotify ID from URI (can be null)
    type: "track",             // Content type: can be "track", "episode" or "ad"
    media_type: "audio",       // Type of file: can be "audio" or "video"
    name: "Song Name",         // Name of content
    is_playable: true,         // Flag indicating whether it can be played
    album: {
      uri: 'spotify:album:0CLCgSt8wDFmoDpLLN09X2', // Spotify Album URI
      name: 'Without Words: Genesis',
      images: [
        { url: "https://image/xxxx" }
      ]
    },
    artists: [
      { uri: 'spotify:artist:xxxx', name: "Artist Name" }
    ]
  },
  tokens: {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  },
  api: new SpotifyWebApi(),
  playbackState: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      state.tokens.accessToken = action.payload.accessToken;
      state.tokens.refreshToken = action.payload.refreshToken;
      state.api.setAccessToken(action.payload.accessToken);
      return state;
    case CLEAR_TOKENS:
      localStorage.clear();
      state.tokens.accessToken = undefined;
      state.tokens.refreshToken = undefined;
      state.api = new SpotifyWebApi();
      return state;

    case NEXT_TRACK:
      var { currentTrack, nextTracks, previousTracks } = state;

      if (nextTracks.length > 0) {
        previousTracks.push(currentTrack);
        currentTrack = nextTracks.shift();
        state.api.play({ uris: [currentTrack.uri, SIGNAL_TRACK] }, (err, res) => {
          if (err) {
            console.log(err);
          }
        });

        return Object.assign({}, state, {
          nextTracks: nextTracks,
          previousTracks: previousTracks,
          currentTrack: currentTrack
        });
      }
      else {
        return state;
      }

    case PREVIOUS_TRACK:
      var { currentTrack, nextTracks, previousTracks } = state;

      if (previousTracks.length > 0) {
        nextTracks = [currentTrack, ...nextTracks];
        currentTrack = previousTracks.pop();
        state.api.play({ uris: [currentTrack.uri, SIGNAL_TRACK] }, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
        return Object.assign({}, state, {
          nextTracks: nextTracks,
          previousTracks: previousTracks,
          currentTrack: currentTrack
        });
      }
      else {
        return state;
      }
    case SET_NEXT_TRACKS:
      return Object.assign({}, state, {
        nextTracks: action.payload,
      });
    case SET_PLAYER:
      state.player = action.payload;
      state.player.addListener('ready', ({ device_id }) => {
        //setDevice(device_id, localStorage.getItem('accessToken'));
        state.api.play({
          uris: ['spotify:track:5xW6Gs4ZKePJOZguvG6RV8', 'spotify:track:7cvTBgG2OFDvY2pIl3WN9C'],
          device_id: device_id
        }, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
        console.log('Ready with Device ID', device_id);
      });
      return state;
    case SET_PLAYBACK_STATE:
      return Object.assign({}, state, {
        playbackState: action.payload,
      });
    default:
      return state;
  }
}
