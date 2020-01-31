import { SET_STATE, CLEAR_STATE } from '../actions/playbackStateActions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_STATE:
      return action.payload
    case CLEAR_STATE:
      return null
    default:
      return state
  }
}