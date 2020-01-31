import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, CLEAR_TOKENS } from '../actions/authActions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      localStorage.setItem('accessToken', action.payload);
      return {
        tokens: state
      }
    case SET_REFRESH_TOKEN:
      localStorage.setItem('refreshToken', action.payload);
      return {
        tokens: state
      }
    case CLEAR_TOKENS:
      localStorage.clear();
      return {
        tokens: state
      }
    default:
      return state
  }
}