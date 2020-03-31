import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import spotify from './spotifyReducer';
import room from './roomReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  spotify: spotify,
  room: room
});

export default createRootReducer
