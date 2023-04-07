import { useState } from "react";
import { gapi } from "gapi-script";
import { Check, Hub } from "@mui/icons-material";
import { Grid, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { FileCard } from "./File";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [driveLoading, setDriveLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    setAuthLoading(true);
    gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        setAuthLoading(false);
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          setUser(gapi.auth2.getAuthInstance().currentUser.le.wt.Ad);
        }

        listFiles();
      });
  };

  const listFiles = (searchTerm = null) => {
    setDriveLoading(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields:
          "nextPageToken, files(id, name, mimeType, permissions, webContentLink)",
        q: searchTerm,
      })
      .then((response) => {
        setDriveLoading(false);
        const res = JSON.parse(response.body).files;
        console.log(res);
        setFiles(res);
      });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid item>
        <LoadingButton
          onClick={handleClientLoad}
          loading={authLoading}
          loadingPosition="start"
          color={user ? "success" : "secondary"}
          startIcon={user ? <Check /> : <Hub />}
          sx={{
            borderRadius: "10px",
          }}
          variant="outlined"
        >
          {user ? `Signed in as ${user}` : "Connect your Google Drive"}
        </LoadingButton>
      </Grid>
      {driveLoading && <CircularProgress />}
      <Grid item>
        <Grid container spacing={3}>
          <Grid container item>
            {files.slice(0, 3).map((file, i) => (
              <FileCard key={`file-card-${i}`} file={file} />
            ))}
          </Grid>
          <Grid container item>
            {files.slice(3, 6).map((file, i) => (
              <FileCard key={`file-card-${i}`} file={file} />
            ))}
          </Grid>
          <Grid container item>
            {files.slice(6, 9).map((file, i) => (
              <FileCard key={`file-card-${i}`} file={file} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
