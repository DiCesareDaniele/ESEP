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
  Button,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import useTokenVerify from "../utils/tokenVerify";

import axios from "axios";

const fetchData = async (token, filter) => {
  return fetch("config.json")
    .then((resp) => resp.json())
    .then((config) =>
      axios.post(
        config.php.baseUrl + "fetchDetections.php",
        { token, filter },
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

  const [utility, setUtility] = useState(0);
  const [site, setSite] = useState("");
  const [meter, setMeter] = useState();

  const [detections, setDetections] = useState([]);
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    fetchData(token, {})
      .then((resp) => {
        if (resp.err !== undefined) {
          alert(resp.err);
        } else {
          setDetections(resp);
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
        <TextField
          onChange={(e) => setMeter(parseInt(e.target.value))}
          label="meter"
          placeholder="Filter by meter"
          fullWidth
          type="number"
          style={inputStyle}
        ></TextField>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">UTILITY</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={utility}
            label="UTILITY"
            onChange={(e) => setUtility(e.target.value)}
          >
            <MenuItem value={0}>*</MenuItem>
            <MenuItem value={1}>EE</MenuItem>
            <MenuItem value={2}>GAS</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#0177fb",
            color: "#ffffff",
            margin: 10,
            width: 100,
            height: 50,
          }}
          onClick={() => {
            let token = JSON.parse(sessionStorage.getItem("token"));
            let query = { utility };
            if (site !== "" && site !== undefined) {
              query.site = site;
            }
            if (meter !== undefined || meter !== null) {
              query.meter = meter;
            }
            fetchData(token, query)
              .then((resp) => {
                if (resp.err !== undefined) {
                  alert(resp.err);
                } else {
                  setDetections(resp);
                }
              })
              .catch((err) => alert(err));
          }}
        >
          FILTER
        </Button>
      </Paper>
      <Box style={{ height: 100 }}></Box>
      <TableContainer component={Paper} style={tableStyle} elevation={10}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>SITE/METER</TableCell>
              <TableCell style={headerCellStyle} align="right">
                PERIOD
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                CONSUMPTION
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                UTILITY
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detections.map((detection) => (
              <TableRow
                key={detection.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={bodyCellStyle} component="th" scope="row">
                  {detection.site}/{detection.id_meter}
                </TableCell>
                <TableCell style={bodyCellStyle} align="right">
                  {detection.date_S}/{detection.date_F}
                </TableCell>
                <TableCell style={bodyCellStyle} align="right">
                  {detection.detection}{" "}
                  {detection.utility === "EE" ? "Kw" : "m3"}
                </TableCell>
                <TableCell style={bodyCellStyle} align="right">
                  {detection.utility}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Sites;
