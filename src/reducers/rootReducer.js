import { combineReducers } from 'redux';
import playbackState from './playbackStateReducer';
import auth from './authReducer';

export default combineReducers({
  playbackState,
  auth
});