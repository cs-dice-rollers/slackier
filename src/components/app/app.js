import React from 'react';
import io from 'socket.io-client';

import style from './app.scss';

io('http://localhost:3000');

export default function App() {
  return (
    <div>
      <h1 className={style.header}>Hello, Electron!</h1>
      <p>This is the app</p>
    </div>
  );
}
