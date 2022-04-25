import React from "react";

import { Paper, Grid, Button, Box, Alert } from "@mui/material";

import { useNavigate } from "react-router-dom";

const PageNotFound = ({ style }) => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    width: 600,
    backgroundColor: "#ffffff",
    margin: "auto",
  };
  return (
    <Grid style={style} container alignItems="center" justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Alert severity="error" style={{ height: 50, fontSize: 20 }}>
          404 page not found ;(
        </Alert>
        <Box style={{ height: 70 }}></Box>
        <Box style={{ height: 100 }}>
          <Box justifyContent="center" display="flex">
            <Button
              style={{ height: 60 }}
              variant="contained"
              onClick={() => navigate(-1)}
            >
              Go back to previous page
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PageNotFound;
