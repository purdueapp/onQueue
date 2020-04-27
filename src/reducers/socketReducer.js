import io from 'socket.io-client';
import { SOCKET_EMIT } from '../actions/socketActions';

let initialState = io('https://on-queue.herokuapp.com/');

export default (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_EMIT:
      let { eventName, data } = action.payload;
      state.emit(eventName, data);

      return state;
    default:
      return state;
  }
}