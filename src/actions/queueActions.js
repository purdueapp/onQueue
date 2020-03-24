export const SET_NEXT_TRACKS = 'SET_NEXT_TRACKS';
export const SET_PREVIOUS_TRACKS = 'SET_PREVIOUS_TRACKS';
export const NEXT_TRACK = 'NEXT_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';

export const setNextTracks = (tracks) => dispatch => {
  dispatch({
    type: SET_NEXT_TRACKS,
    payload: tracks
  })
}

export const setPreviousTracks = (tracks) => dispatch => {
  dispatch({
    type: SET_PREVIOUS_TRACKS,
    payload: tracks
  })
}

export const nextTrack = () => dispatch => {
  dispatch({
    type: NEXT_TRACK
  })
}

export const previousTrack = () => dispatch => {
  dispatch({
    type: PREVIOUS_TRACK
  })
}