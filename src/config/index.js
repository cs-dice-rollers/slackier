const config = {
  eventNames: {
    sendMessage: 'CLIENT_MESSAGE',
    receiveMessage: 'SERVER_MESSAGE',
  },
  socketServer: process.env.SOCKET_SERVER || 'http://localhost:3000',
};

module.exports = config;
