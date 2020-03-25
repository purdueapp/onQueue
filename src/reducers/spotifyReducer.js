import SpotifyWebApi from 'spotify-web-api-js';
import { CLEAR_TOKENS, SET_PLAYER, SET_PLAYBACK_STATE, NEXT_TRACK, PREVIOUS_TRACK, SET_TOKENS, SET_NEXT_TRACKS, DEFAULT_TRACK, SIGNAL_TRACK } from '../actions/spotifyActions';

let initialCurrentTrack = {
  uri: DEFAULT_TRACK, // Spotify URI
  id: "5xW6Gs4ZKePJOZguvG6RV8",                // Spotify ID from URI (can be null)
  type: "track",             // Content type: can be "track", "episode" or "ad"
  media_type: "audio",       // Type of file: can be "audio" or "video"
  name: "Rylynn",         // Name of content
  is_playable: true,         // Flag indicating whether it can be played
  album: {
    uri: 'spotify:album:5oaWyt3rCD0JTDhv6BbEaQ', // Spotify Album URI
    name: 'Art of Motion',
    images: [
      { url: "https://i.scdn.co/image/ab67616d00001e0234ac7c39be02c2915857287c" }
    ]
  },
  artists: [
    { uri: 'spotify:artist:59T0qdTmDGZ1g0slfSbPfy', name: "Andy Mckee" }
  ]

};

let initialState = {
  player: undefined,
  trackWindow: {
    nextTracks: [],
    previousTracks: [],
    currentTrack: initialCurrentTrack,
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
      var { currentTrack, nextTracks, previousTracks } = state.trackWindow;
  
      previousTracks.push(currentTrack);
      currentTrack = nextTracks.length > 0 ? nextTracks.shift() : initialCurrentTrack;
      state.api.play({ uris: [currentTrack.uri, SIGNAL_TRACK] }, (err, res) => {
        if (err) {
          console.log(err);
        }
      });

      return Object.assign({}, state, {
        trackWindow: {
          nextTracks: nextTracks,
          previousTracks: previousTracks,
          currentTrack: currentTrack
        }
      });

    case PREVIOUS_TRACK:
      var { currentTrack, nextTracks, previousTracks } = state.trackWindow;

      if (previousTracks.length > 0) {
        nextTracks = [currentTrack, ...nextTracks];
        currentTrack = previousTracks.pop();
        state.api.play({ uris: [currentTrack.uri, SIGNAL_TRACK] }, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
        return Object.assign({}, state, {
          trackWindow: {
            nextTracks: nextTracks,
            previousTracks: previousTracks,
            currentTrack: currentTrack
          }
        });
      }
      else {
        return state;
      }
    case SET_NEXT_TRACKS:
      var { currentTrack, previousTracks } = state.trackWindow;

      return Object.assign({}, state, {
        trackWindow: {
          nextTracks: action.payload,
          previousTracks: previousTracks,
          currentTrack: currentTrack
        }
      });
    case SET_PLAYER:
      state.player = action.payload;
      state.player.addListener('ready', ({ device_id }) => {
        //setDevice(device_id, localStorage.getItem('accessToken'));
        state.api.play({
          uris: [DEFAULT_TRACK, SIGNAL_TRACK],
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
