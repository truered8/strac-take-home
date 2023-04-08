# Strac Take Home Project

## Demo

https://share.vidyard.com/watch/eXqvDPKS4YvJ9tiknP7gCZ

## Instructions

1. Install [node.js](https://nodejs.org/en) and [yarn](https://yarnpkg.com/).
2. Clone the project.

```sh
git clone https://github.com/truered8/strac-take-home.git
```

3. Install the dependencies.

```sh
yarn install
```

4. Create OAuth 2.0 authorization credentials using [these instructions](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow).
5. Create a file called `.env` that has the following format:

```
REACT_APP_GOOGLE_DRIVE_API_KEY="INSERT API KEY"
REACT_APP_GOOGLE_DRIVE_CLIENT_ID="INSERT CLIENT ID"
```

6. Run the program.

```sh
yarn start
```

7. Go to [localhost:3000](http://localhost:3000) in your web browser.

## Notes

Features include:

- Connecting to Google Drive
- Listing files and folders
- Downloading files
- Pagination
- Listing people/groups who have access to each item

Due to time constraints, real-time updates were not implemented; however, given more time it would have been implemented as such:

- Google's API would be called from the frontend to subscribe to changes to the current files (https://developers.google.com/drive/api/guides/push)
- A web server would be created which listens to these changes
- The server would emit events over WebSocket whenever it recieves these calls from Google
- The frontend would listen to these events, and notify the user in real-time
- The [socket.io](https://socket.io/) library would be used as a wrapper for WebSocket communication
