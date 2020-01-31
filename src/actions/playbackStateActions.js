export const SET_STATE = 'SET_STATE';
export const CLEAR_STATE = 'CLEAR_STATE';

export const setPlaybackState = (playbackState) => dispatch => {
  dispatch({
    type: SET_STATE,
    payload: playbackState
  })
}