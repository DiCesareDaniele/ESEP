import {
  TextField,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Alert,
} from "@mui/material";

import { React, useState } from "react";
import axios from "axios";

const FormLogin = ({ style }) => {
  const login = async () => {
    if (!email || !password) {
      setErr("All field must be filled");
      return;
    }
    try {
      let resp = await axios.post(
        (await config).php.baseUrl + "login.php",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data.err !== undefined) {
        setErr(resp.data.err);
        return;
      } //else if () {
      console.log(resp.data);
      //}
    } catch (err) {
      console.log(err);
      setErr("an error occurred");
    }
  };

  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const config = fetch("config.json")
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch(() => setErr("An error occurred"));
  const paperStyle = {
    padding: 20,
    width: 600,
    backgroundColor: "#ffffff",
    margin: "auto",
  };
  const inputStyle = {
    marginTop: 20,
    backgroundColor: "#ffffff",
  };
  const singInStyle = {
    height: "60px",
  };
  return (
    <Grid style={style} container>
      <Paper elevation={10} style={paperStyle}>
        {err !== "" && <Alert severity="warning">{err}</Alert>}
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
          placeholder="Enter your Email"
          fullWidth
          required
          style={inputStyle}
        ></TextField>
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          type="password"
          placeholder="Enter your Password"
          fullWidth
          required
          style={inputStyle}
        ></TextField>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          onChange={(e) => {
            setRemember(e.target.checked);
          }}
        />
        <Button
          onClick={login}
          type="submit"
          variant="contained"
          color="primary"
          style={singInStyle}
          fullWidth
        >
          Sign in
        </Button>
        <Link href="#" underline="hover">
          Forgot password ?
        </Link>
      </Paper>
    </Grid>
  );
};

export default FormLogin;
