import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Check, Hub, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ButtonGroup, CircularProgress, Grid, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { FileCard } from "./File";

const COLUMNS = 3;
const PAGE_SIZE = 12;
const ROW_ARRAY = [...Array(PAGE_SIZE / COLUMNS).keys()];

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [driveLoading, setDriveLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [tokens, setTokens] = useState([null]);

  const handleClientLoad = async () => {
    if (!user) gapi.load("client:auth2", initClient);
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

  const listFiles = (searchTerm = null, previous = false) => {
    setDriveLoading(true);
    let token = null;
    if (previous) {
      token = tokens[tokens.length - 3];
    } else if (tokens.length > 1) {
      token = tokens[tokens.length - 1];
    }
    gapi.client.drive.files
      .list({
        pageSize: PAGE_SIZE,
        fields:
          "nextPageToken, files(id, name, mimeType, permissions, webContentLink)",
        q: searchTerm,
        pageToken: token,
      })
      .then((response) => {
        setDriveLoading(false);
        const res = JSON.parse(response.body);
        if (previous) {
          setTokens(tokens.slice(0, tokens.length - 1));
        } else {
          setTokens([...tokens, res.nextPageToken]);
        }
        setFiles(res.files);
      });
  };

  useEffect(() => {
    console.log(tokens);
  }, [tokens]);

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
      <Grid item>
        <Grid container spacing={3}>
          {ROW_ARRAY.map((i) => (
            <Grid container item>
              {files.slice(i * COLUMNS, (i + 1) * COLUMNS).map((file, j) => (
                <FileCard key={`file-card-${j}`} file={file} />
              ))}
            </Grid>
          ))}
        </Grid>
        {user && (
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              marginX: "1em",
              float: "right",
            }}
          >
            {driveLoading && <CircularProgress size="1.5em" />}
            <IconButton
              onClick={() => listFiles(null, true)}
              disabled={tokens.length < 3 || driveLoading}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => listFiles(null, false)}
              disabled={driveLoading}
            >
              <ChevronRight />
            </IconButton>
          </ButtonGroup>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
