import { SET_HOST, SET_ROOM_STATE, SET_PLAYER_STATE, SET_MEMBERS, SET_SETTINGS, SET_TRACK_WINDOW } from '../actions/roomActions';
import { DEFAULT_TRACK } from '../actions/spotifyActions';

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
  playerState: {
    trackWindow: {
      currentTrack: initialCurrentTrack,
      nextTracks: [],
      previousTracks: []
    },
    duration: 0,
    position: 0,
    paused: false,
    volume: 0,
  },
  members: [],
  host: {},
  settings: {
    queueLimit: 100,
    private: false,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM_STATE:
      return action.payload;
    /*
    case INCREMENT_POSITION:
      return Object.assign({}, state, {
        playerState: {
          ...state.playerState,
          position: state.position + 1000
        }
      });
    */
    case SET_PLAYER_STATE:
      return Object.assign({}, state, {
        playerState: {
          ...state.playerState,
          ...action.payload
        }
      })
    case SET_TRACK_WINDOW:
      return Object.assign({}, state, {
        playerState: {
          ...state.playerState,
          trackWindow: {
            ...state.playerState.trackWindow,
            ...action.payload
          },
        }
      })
    case SET_MEMBERS:
      return Object.assign({}, state, {
        members: action.payload
      });
    case SET_SETTINGS:
      return Object.assign({}, state, {
        settings: {
          ...state.settings,
          ...action.payload
        }
      })
    case SET_HOST:
      return Object.assign({}, state, {
        host: action.payload
      });
    default:
      return state;
  }
}