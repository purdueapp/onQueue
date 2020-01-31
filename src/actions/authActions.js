export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const CLEAR_TOKENS = 'CLEAR_TOKENS';

export const setAccessToken = (token) => dispatch => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload: token
  })
}

export const setRefreshToken = (token) => dispatch => {
  dispatch({
    type: SET_REFRESH_TOKEN,
    payload: token
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
