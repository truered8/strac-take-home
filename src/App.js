import { Box, Grid, Typography } from "@mui/material";

import { DriveInput } from "./DriveInput";

const App = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid item>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              margin: "5px",
              padding: "5px",
            }}
          >
            Enter your drive here:{" "}
          </Typography>
          <DriveInput />
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
