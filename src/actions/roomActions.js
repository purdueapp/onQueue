import { SOCKET_EMIT } from './socketActions';

export const SET_ROOM_STATE = 'SET_ROOM_STATE';
export const INCREMENT_POSITION = 'INCREMENT_POSITION';
export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';
export const SET_MEMBERS = 'SET_MEMBERS';
export const SET_SETTINGS = 'SET_SETTINGS';
export const SET_TRACK_WINDOW = 'SET_TRACK_WINDOW';
export const SET_HOST = 'SET_HOST';

export const setRoomState = (state) => dispatch => {
  dispatch({
    type: SET_ROOM_STATE,
    payload: state
  })
}

export const setTrackWindow = (state) => dispatch => {
  dispatch({
    type: SET_TRACK_WINDOW,
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

export const setHost = (host) => dispatch => {
  dispatch({
    type: SET_HOST,
    payload: host
  })
}

export const play = () => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'play'
      }
    }
  })
}

export const pause = () => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'pause'
      }
    }
  })
}

export const next = () => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'next'
      }
    }
  })
}

export const previous = () => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'previous'
      }
    }
  })
}

export const reorder = (start, end) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'reorder',
        start: start,
        end: end
      }
    }
  })
}

export const seek = (position) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'seek',
        position: position
      }
    }
  })
}

export const setRepeat = (repeat) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'repeat',
        repeat: repeat
      }
    }
  })
}

export const setVolume = (volume) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'volume',
        volume: volume
      }
    }
  })
}

export const queue = (track) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'queue',
        track: track
      }
    }
  })
}

export const remove = (track) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: {
      eventName: 'command',
      data: {
        type: 'remove',
        track: track
      }
    }
  })
}