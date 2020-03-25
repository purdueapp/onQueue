import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import host from './hostReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  host
});

export default createRootReducer
