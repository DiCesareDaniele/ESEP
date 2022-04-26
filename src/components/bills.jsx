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
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import useTokenVerify from "../utils/tokenVerify";

import axios from "axios";

const fetchData = async (token) => {
  return fetch("config.json")
    .then((resp) => resp.json())
    .then((config) =>
      axios.post(
        config.php.baseUrl + "fetchBills.php",
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

const payBill = async (token, bill_id) => {
  return fetch("config.json")
    .then((resp) => resp.json())
    .then((config) =>
      axios.post(
        config.php.baseUrl + "payBill.php",
        { token, id: bill_id },
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

  const [bills, setBills] = useState([]);

  const [billsRefresh, setBillsRefresh] = useState([false]);

  const [showPaid, setShowPaid] = useState(false);
  const [showToPay, setShowToPay] = useState(false);

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    fetchData(token)
      .then((resp) => {
        if (resp.err !== undefined) {
          alert(resp.err);
        } else {
          setBills(resp);
        }
      })
      .catch((err) => alert(err));
  }, [billsRefresh]);

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

  const headerCellStyle = { fontSize: 20, color: "#ffffff" };
  const bodyCellStyle = { color: "#ffffff" };

  return (
    <Grid container style={style}>
      <Paper style={paperStyle}>
        <Typography fontWeight={600}>FILTER BY</Typography>
        <FormControlLabel
          control={<Checkbox defaultChecked={false} />}
          label="STILL TO PAY"
          onChange={(e) => setShowToPay(e.target.checked)}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked={false} />}
          label="ALREADY PAID"
          onChange={(e) => setShowPaid(e.target.checked)}
        />
      </Paper>
      <TableContainer component={Paper} style={tableStyle} elevation={10}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>TYPE</TableCell>
              <TableCell style={headerCellStyle} align="right">
                PERIOD
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                DEADLINE
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                DATE PAYMENT
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                PRICE €
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                AVERAGE CONSUMPTION
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                PAY
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map(
              (bill) =>
                (showPaid === showToPay ||
                  (showPaid && bill.date_P != null) ||
                  (showToPay && bill.date_P === null)) && (
                  <TableRow
                    key={bill.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={bodyCellStyle} component="th" scope="row">
                      {bill.type}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {bill.date_S}/{bill.date_F}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {bill.deadline}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {bill.date_P}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {bill.price}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {bill.avg_waste} {bill.utility === "EE" ? "Kw" : "m3"}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {typeof bill.date_P !== "string" && (
                        <Button
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#0177fb",
                          }}
                          onClick={() => {
                            payBill(token, bill.id).then((resp) => {
                              if (resp.err !== undefined) {
                                alert("an error occurred" + resp.err);
                              } else {
                                setBillsRefresh(!billsRefresh);
                                alert("bill paid");
                              }
                            });
                          }}
                        >
                          PAY
                        </Button>
                      )}
                      {typeof bill.data_p === "string" && ""}
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
