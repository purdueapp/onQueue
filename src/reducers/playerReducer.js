import { SET_PLAYER, CLEAR_PLAYER } from '../actions/playerActions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return action.payload
    case CLEAR_PLAYER:
      return null
    default:
      return state
  }
}