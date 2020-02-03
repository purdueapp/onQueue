export const SET_PLAYER = 'SET_PLAYER';
export const CLEAR_PLAYER = 'CLEAR_PLAYER';

export const setPlayer = (player) => dispatch => {
  dispatch({
    type: SET_PLAYER,
    payload: player
  })
}