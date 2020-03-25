import { SET_NEXT_TRACKS, SET_PREVIOUS_TRACKS, NEXT_TRACK, PREVIOUS_TRACK, SET_CURRENT_TRACK } from '../actions/queueActions';

export default (state = {
  nextTracks: [],
  previousTracks: [],
  currentTrack: {
    uri: 'spotify:track:5xW6Gs4ZKePJOZguvG6RV8', // Spotify URI
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
  }
}, action) => {
  switch (action.type) {
    case SET_NEXT_TRACKS:
      state.nextTracks = action.payload
      return state
    case SET_PREVIOUS_TRACKS:
      state.previousTracks = action.payload
      return state
    case SET_CURRENT_TRACK:
      state.currentTrack = action.payload
      return state
    case NEXT_TRACK:
      if (state.nextTracks.length > 0) {
        state.previousTracks.push(state.currentTrack);
        state.currentTrack = state.nextTracks.shift();
      }
      return state;
    case PREVIOUS_TRACK:
      if (state.previousTracks.length > 0) {
        state.nextTracks = [state.currentTrack, ...state.nextTracks];
        state.currentTrack = state.previousTracks.pop()
      }
      return state;
    default:
      return state
  }
}
