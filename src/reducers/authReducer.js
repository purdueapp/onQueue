import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, CLEAR_TOKENS } from '../actions/authActions';

export default (state = {}, action) => {
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      localStorage.setItem('accessToken', action.payload);
      return {
        accessToken: action.payload,
        refreshToken: state.refreshToken
      }
    case SET_REFRESH_TOKEN:
      localStorage.setItem('refreshToken', action.payload);
      return {
        accessToken: state.accessToken,
        refreshToken: action.payload
      }
    case CLEAR_TOKENS:
      localStorage.clear();
      return { }
    default:
      return state
  }
}