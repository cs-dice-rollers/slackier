import React from 'react';
import socket from '../../lib/socket';

import style from './app.scss';

socket.on('NEW_MESSAGE', (data) => {
  console.log(data);
});

socket.emit('MESSAGE', { message: 'yo' });


export default function App() {
  return (
    <div>
      <h1 className={style.header}>Hello, Electron!</h1>
      <p>This is the app</p>
    </div>
  );
}
