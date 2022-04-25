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

import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";

const FormLogin = ({ style }) => {
  const login = async () => {
    if (remember) {
      cookieManager.set("email", email, { path: "/" });
    } else {
      cookieManager.set("email", "", { path: "/", expires: 0 });
    }
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
      if (resp.data.exception !== undefined) {
        setErr(resp.data.exception);
        return;
      } else if (resp.data.err !== undefined) {
        setErr(resp.data.err);
        return;
      } else if (resp.data.token === undefined) {
        console.log(resp.data);
        setErr("unexpected error");
        return;
      }
      sessionStorage.setItem("token", resp.data.token);
      navigate("/personal-area");
    } catch (err) {
      console.log(err);
      setErr("unexpected error");
    }
  };

  const cookieManager = new Cookies();
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [email, setEmail] = useState(cookieManager.get("email"));
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const config = fetch("config.json")
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch(() => setErr("unexpected error"));
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
          defaultValue={cookieManager.get("email")}
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
          style={{
            height: "60px",
          }}
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
