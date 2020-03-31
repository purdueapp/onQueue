import { SOCKET_EMIT } from './socketActions';

export const SET_ROOM_STATE = 'SET_ROOM_STATE';
export const INCREMENT_POSITION = 'INCREMENT_POSITION';
export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';
export const SET_MEMBERS = 'SET_MEMBERS';
export const SET_SETTINGS = 'SET_SETTINGS';
export const SET_TRACK_WINDOW = 'SET_TRACK_WINDOW';

export const setRoomState = (state) => dispatch => {
  dispatch({
    type: SET_ROOM_STATE,
    payload: state
  })
}

export const incrementPosition = () => dispatch => {
  dispatch({
    type: INCREMENT_POSITION
  })
}

export const setPlayerState = (state) => dispatch => {
  dispatch({
    type: SET_PLAYER_STATE,
    payload: state
  })
}

export const setMembers = (members) => dispatch => {
  dispatch({
    type: SET_MEMBERS,
    payload: members
  })
}

export const setSettings = (settings) => dispatch => {
  dispatch({
    type: SET_SETTINGS,
    payload: settings
  })
}

export const play = () => dispatch => {
  
}