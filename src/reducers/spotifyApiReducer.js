import { SET_SPOTIFY_API, CLEAR_SPOTIFY_API } from '../actions/spotifyApiActions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SPOTIFY_API:
      return action.payload
    case CLEAR_SPOTIFY_API:
      return null
    default:
      return state
  }
}