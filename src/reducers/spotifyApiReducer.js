import { SET_SPOTIFY_API, CLEAR_SPOTIFY_API, SET_SPOTIFY_API_ACCESS_TOKEN } from '../actions/spotifyApiActions';
import SpotifyWebApi from 'spotify-web-api-js';

export default (state = new SpotifyWebApi(), action) => {
  switch (action.type) {
    case SET_SPOTIFY_API_ACCESS_TOKEN:
      state.setAccessToken(action.payload);
      return state
    case SET_SPOTIFY_API:
      return action.payload
    case CLEAR_SPOTIFY_API:
      return null
    default:
      return state
  }
}