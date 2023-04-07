import { Button } from "@mui/material";
import { gapi } from "gapi-script";

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

export const DriveInput = () => {
  const initClient = () => {
    // setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {}
      );
  };

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  /**
   *  Sign out the user upon button click.
   */
  const handleSignOutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <Button
      onClick={handleClientLoad}
      sx={{
        borderRadius: "50%",
      }}
    />
  );
};
