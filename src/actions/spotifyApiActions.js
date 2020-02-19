export const SET_SPOTIFY_API = 'SET_SPOTIFY_API';
export const SET_SPOTIFY_API_ACCESS_TOKEN = 'SET_SPOTIFY_API_ACCESS_TOKEN';
export const CLEAR_SPOTIFY_API = 'CLEAR_SPOTIFY_API';

export const setSpotifyApi = (accessToken) => dispatch => {
  dispatch({
    type: SET_SPOTIFY_API_ACCESS_TOKEN,
    payload: accessToken
  })
}

export const clearSpotifyApi = () => dispatch => {
  dispatch({
    type: CLEAR_SPOTIFY_API
  })
}