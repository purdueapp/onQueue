import SpotifyWebApi from 'spotify-web-api-node';

export const SET_SPOTIFY_API = 'SET_SPOTIFY_API';
export const CLEAR_SPOTIFY_API = 'CLEAR_SPOTIFY_API';

export const setSpotifyApi = (accessToken) => dispatch => {
    let spotifyApi = new SpotifyWebApi({
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
        redirectUri: `${window.location.origin}/callback`
      });

      spotifyApi.setAccessToken(accessToken);

  dispatch({
    type: SET_SPOTIFY_API,
    payload: spotifyApi
  })
}

export const clearSpotifyApi = () => dispatch => {
  dispatch({
    type: CLEAR_SPOTIFY_API
  })
}