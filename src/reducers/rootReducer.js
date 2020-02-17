import { combineReducers } from 'redux';
import playbackState from './playbackStateReducer';
import auth from './authReducer';
import player from './playerReducer';
import spotifyApi from './spotifyApiReducer';

export default combineReducers({
  playbackState,
  auth,
  player,
  spotifyApi
});