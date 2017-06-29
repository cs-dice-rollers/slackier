import React from 'react';
import { sendMessage, registerMessageListener } from '../../lib/socket';

import style from './app.scss';

sendMessage('hello');

registerMessageListener((messageData) => {
  console.log(messageData.text);
});


export default function App() {
  return (
    <div>
      <h1 className={style.header}>Hello, Electron!</h1>
      <p>This is the app</p>
    </div>
  );
}
