import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import spotify from './spotifyReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  spotify: spotify
});

export default createRootReducer
