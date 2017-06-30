# slackier #

A chat application built with Electron. Even better than Slack (if by better you mean not better).

## Run the Application ##

Install Node.js 6.x or above.

Install dependencies:

```
$ yarn
```

### Development ###

Running the application in development requires both the webpack dev server and electron. These commands have been combined into a single npm command (via the use of `concurrently`):

```
$ npm start
```

### Packaging for "Production" ###

To run this app in a "production" like environment, or to package the application, follow these steps:

Build the webpack bundle:

```
$ npm run build
```

(Optional) Verify the application works correctly:

```
$ npm run production
```

As of now, a few things must be changed (hacked) prior to packaging the application:
1. In the `main.js` file, set the `IS_PRODUCTION` to `true`.
1. Set the `SOCKET_SERVER` environment variable to the URL of the socket server.

Bundle the application:

```
$ npm run package-app
```

The packaged app will be within the root of the project.
