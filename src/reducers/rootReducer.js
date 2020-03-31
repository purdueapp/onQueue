import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import spotify from './spotifyReducer';
import room from './roomReducer';
import socket from './socketReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  spotify: spotify,
  room: room,
  socket: socket
});

export default createRootReducer
