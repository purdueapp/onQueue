import { NEXT_TRACK, PREVIOUS_TRACK, PAUSE_PLAYER, RESUME_PLAYER, SEEK_PLAYER, REORDER_NEXT_TRACKS, QUEUE_TRACK } from '../actions/spotifyActions';
import { SET_PLAYER_STATE, SET_TRACK_WINDOW, SET_SETTINGS, SET_MEMBERS, SET_ROOM_STATE } from './roomActions';

export const SOCKET_EMIT = 'SOCKET_EMIT';


export const socketEmit = (eventName, data) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: eventName,
      data: data
    }
  })
}

export const setupUserSocket = (socket) => dispatch => {
  socket.on('update', (data) => {
    console.log('socket update')
    switch (data.type) {
      case 'room':
        dispatch({
          type: SET_ROOM_STATE,
          payload: data.room
        })
      case 'playerState':
        dispatch({
          type: SET_PLAYER_STATE,
          payload: data.playerState
        })
      case 'trackWindow':
        dispatch({
          type: SET_TRACK_WINDOW,
          paylaod: data.trackWindow
        })
      case 'members':
        dispatch({
          type: SET_MEMBERS,
          payload: data.members
        })
      case 'settings':
        dispatch({
          type: SET_SETTINGS,
          payload: data.settings
        })
    }
  })
}

export const setupHostSocket = (socket) => dispatch => {
  socket.on('command', (data) => {
    console.log('socket handle event')
    switch (data.type) {
      case 'next':
        dispatch({
          type: NEXT_TRACK
        })
        break;
      case 'previous':
        dispatch({
          type: PREVIOUS_TRACK
        })
        break;
      case 'pause':
        dispatch({
          type: PAUSE_PLAYER,
        })
        break;

      case 'play':
        dispatch({
          type: RESUME_PLAYER
        })
        break;

      case 'seek':
        dispatch({
          type: SEEK_PLAYER,
          payload: data.position
        })
        break;

      case 'reorder':
        dispatch({
          type: REORDER_NEXT_TRACKS,
          payload: {
            start: data.start,
            end: data.end
          }
        })
        break;

      case 'queue':
        dispatch({
          type: QUEUE_TRACK,
          payload: data.track
        })
        break;

    }
  });
}