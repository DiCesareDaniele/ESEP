import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

import useTokenVerify from "../utils/tokenVerify";

import axios from "axios";

const fetchData = async (token) => {
  return fetch("config.json")
    .then((resp) => resp.json())
    .then((config) =>
      axios.post(
        config.php.baseUrl + "fetchMeters.php",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    )
    .then((resp) => resp.data)
    .catch((err) => alert(err));
};

const Sites = ({ style }) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  useTokenVerify(token);

  const [meters, setMeters] = useState([]);
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    fetchData(token)
      .then((resp) => {
        if (resp.err !== undefined) {
          alert(resp.err);
        } else {
          setMeters(resp);
        }
      })
      .catch((err) => alert(err));
  }, []);

  const tableStyle = {
    padding: 20,
    width: "90%",
    backgroundColor: "#243142",
    margin: "auto",
  };
  const paperStyle = {
    padding: 20,
    width: "90%",
    backgroundColor: "#ffffff",
    margin: "auto",
  };
  const inputStyle = {
    backgroundColor: "#ffffff",
    width: 150,
    margin: 10,
  };

  const [site, setSite] = useState("");

  const headerCellStyle = { fontSize: 20, color: "#ffffff" };
  const bodyCellStyle = { color: "#ffffff" };

  return (
    <Grid container style={style}>
      <Paper style={paperStyle}>
        <Typography fontWeight={600}>FILTER BY</Typography>
        <TextField
          onChange={(e) => setSite(e.target.value)}
          label="site"
          placeholder="Filter by site"
          fullWidth
          style={inputStyle}
        ></TextField>
      </Paper>
      <TableContainer component={Paper} style={tableStyle} elevation={10}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>METER ID</TableCell>
              <TableCell style={headerCellStyle} align="right">
                SITE
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                UTILITY
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meters.map(
              (meter) =>
                (site == null || site === "" || meter.site === site) && (
                  <TableRow
                    key={meter.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={bodyCellStyle} component="th" scope="row">
                      {meter.id}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {meter.site}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {meter.utility}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Sites;
