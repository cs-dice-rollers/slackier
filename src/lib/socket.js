import io from 'socket.io-client';
import config from '../config';

const socket = io(config.socketServer);

export default socket;

export function sendMessage(text) {
  socket.emit(config.eventNames.sendMessage, { text });
}

export function registerMessageListener(callback) {
  socket.on(config.eventNames.receiveMessage, callback);
}
