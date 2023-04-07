import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Download, ExpandMore } from "@mui/icons-material";

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export const FileCard = ({ file }) => {
  return (
    <Grid item xs={4}>
      <Accordion
        sx={{
          padding: "10px",
          margin: "10px",
        }}
      >
        <AccordionSummary
          expandIcon={
            <>
              {file.webContentLink && (
                <Box sx={{ float: "right" }}>
                  <a
                    href={file.webContentLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download />
                  </a>
                </Box>
              )}
              <ExpandMore />
            </>
          }
          sx={{ display: "flex", flexGrow: "1" }}
        >
          <Typography variant="subtitle1" color="black">
            {file.name}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {file.permissions &&
            file.permissions.map((permission, i) => (
              <Typography variant="subtitle2" key={`permission-${i}`}>
                <strong>{capitalize(permission.role)}:</strong>{" "}
                {permission.displayName ?? permission.type}
                <br />
              </Typography>
            ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};
