import React, { Component } from 'react';
import { sendMessage, registerMessageListener } from '../../lib/socket';

import style from './app.scss';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      log: [],
      message: '',
    };

    registerMessageListener((messageData) => {
      this.setState({
        log: this.state.log.concat(messageData.text),
      });
    });
  }

  componentDidMount() {
    this.node.scrollIntoView();
  }

  componentDidUpdate() {
    this.node.scrollIntoView();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(this.state.message);

    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <div className={style.container}>
        <h1 className={style.header}>This is Slackier</h1>

        <div className={style.log}>
          {
            this.state.log.map((message, i) => {
              const index = i;
              return (
                /* eslint-disable no-return-assign */
                <div className={style.note} key={index} ref={node => this.node = node}>
                  <p>{message}</p>
                </div>
              );
            })
          }

        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            className={style.message}
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="enter message"
            autoComplete="off"
          />
          <button type="submit" className={style.submitButton} />
        </form>
      </div>
    );
  }
}
