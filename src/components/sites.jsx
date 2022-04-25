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
} from "@mui/material";

import useTokenVerify from "../utils/tokenVerify";

import axios from "axios";

const fetchData = async (token) => {
  return fetch("config.json")
    .then((resp) => resp.json())
    .then((config) =>
      axios.post(
        config.php.baseUrl + "fetchSites.php",
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

  const [sites, setSites] = useState([]);
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    fetchData(token)
      .then((resp) => {
        if (resp.err !== undefined) {
          alert(resp.err);
        } else {
          setSites(resp);
        }
      })
      .catch((err) => alert(err));
  }, []);

  const tableStyle = {
    padding: 20,
    width: "80%",
    backgroundColor: "#243142",
    margin: "auto",
  };

  const headerCellStyle = { fontSize: 20, color: "#ffffff" };
  const bodyCellStyle = { color: "#ffffff" };

  return (
    <Grid container style={style}>
      <TableContainer component={Paper} style={tableStyle} elevation={10}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>SITE</TableCell>
              <TableCell style={headerCellStyle} align="right">
                CITY
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                CAP
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                APPARTMENT_N
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow
                key={site.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={bodyCellStyle} component="th" scope="row">
                  {site.site}
                </TableCell>
                <TableCell style={bodyCellStyle} align="right">
                  {site.city}
                </TableCell>
                <TableCell style={bodyCellStyle} align="right">
                  {site.CAP}
                </TableCell>
                <TableCell style={bodyCellStyle} align="right">
                  {site.apartment_n}
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
