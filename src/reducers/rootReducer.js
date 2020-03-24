import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import playbackState from './playbackStateReducer';
import auth from './authReducer';
import player from './playerReducer';
import spotifyApi from './spotifyApiReducer';
import queue from './queueReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  playbackState,
  auth,
  player,
  spotifyApi,
  queue
});

export default createRootReducer
