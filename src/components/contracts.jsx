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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  TextField,
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
        config.php.baseUrl + "fetchContracts.php",
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

const fetchSupply = async (token, id_contract) => {
  return fetch("config.json")
    .then((resp) => resp.json())
    .then((config) =>
      axios.post(
        config.php.baseUrl + "fetchSupply.php",
        { token, id: id_contract },
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id_contract) => {
    fetchSupply(token, id_contract)
      .then((resp) => setSupply(resp))
      .then(() => setOpen(true))
      .catch((err) => alert(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [contracts, setContracts] = useState([]);
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    fetchData(token)
      .then((resp) => {
        if (resp.err !== undefined) {
          alert(resp.err);
        } else {
          setContracts(resp);
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

  const headerCellStyle = { fontSize: 20, color: "#ffffff" };
  const bodyCellStyle = { color: "#ffffff" };

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
  const [supply, setSupply] = useState({});

  const [showCessated, setShowCessated] = useState(false);
  const [showNotCessated, setShowNotCessated] = useState(false);

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
        <FormControlLabel
          control={<Checkbox defaultChecked={false} />}
          label="NOT CESSATED"
          onChange={(e) => setShowCessated(e.target.checked)}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked={false} />}
          label="CESSATED"
          onChange={(e) => setShowNotCessated(e.target.checked)}
        />
      </Paper>
      <TableContainer component={Paper} style={tableStyle} elevation={10}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>METER</TableCell>
              <TableCell style={headerCellStyle} align="right">
                SITE
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                SUPPLY INFO
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                DATE START
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                DATE END
              </TableCell>
              <TableCell style={headerCellStyle} align="right">
                DATE CESSATION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map(
              (contract) =>
                (site === "" || site === null || site === contract.site) &&
                (showCessated === showNotCessated ||
                  (showCessated && contract.date_C === null) ||
                  (showNotCessated && contract.date_C !== null)) && (
                  <TableRow
                    key={contract.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={bodyCellStyle} component="th" scope="row">
                      {contract.id_meter}/{contract.utility}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {contract.site}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      <Button
                        style={{ color: "#ffffff", backgroundColor: "#0177fb" }}
                        onClick={() => handleClickOpen(contract.id)}
                      >
                        SUPPLY INFO
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{
                          style: { width: 800 },
                        }}
                      >
                        <DialogTitle id="alert-dialog-title"></DialogTitle>
                        OFFERTA: {supply.offer}
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            -UTILITY: {supply.utility}
                          </DialogContentText>
                          <DialogContentText id="alert-dialog-description">
                            -FIXED COSTS: {supply.fixed_costs}
                          </DialogContentText>
                          {supply.utility === "EE" && (
                            <>
                              <DialogContentText id="alert-dialog-description">
                                -VOLTAGE: {supply.voltage}
                              </DialogContentText>
                              <DialogContentText id="alert-dialog-description">
                                -CONTRACTUAL POWER TRESHOLD:
                                {supply.contractual_power_treshold}
                              </DialogContentText>
                              <DialogContentText id="alert-dialog-description">
                                -MAX POWER TRESHOLD: {supply.max_power_treshold}
                              </DialogContentText>
                              <DialogContentText id="alert-dialog-description">
                                -F1: {supply.F1}
                              </DialogContentText>
                              <DialogContentText id="alert-dialog-description">
                                -F2: {supply.F2}
                              </DialogContentText>
                              <DialogContentText id="alert-dialog-description">
                                -F3: {supply.F3}
                              </DialogContentText>
                            </>
                          )}
                          {supply.utility === "GAS" && (
                            <DialogContentText id="alert-dialog-description">
                              -GAS: {supply.gas}
                            </DialogContentText>
                          )}
                          <DialogContentText id="alert-dialog-description">
                            -SUPPLIER: {supply.supplier}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>CLOSE</Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {contract.date_S}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {contract.date_F}
                    </TableCell>
                    <TableCell style={bodyCellStyle} align="right">
                      {contract.date_C}
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
