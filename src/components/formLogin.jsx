import {
  TextField,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from "@mui/material";

import { React, useState } from "react";
import axios from "axios";

const FormLogin = ({ style }) => {
  const login = async () => {
    console.log(mail, password, remember);
    const config = await fetch("config.json")
      .then((resp) => resp.json())
      .catch((err) => err);
    let data = await axios
      .get(config.php.baseUrl + "test.php")
      .then((resp) => resp.data)
      .catch((err) => err);
    console.log(data);
  };

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 600,
    backgroundColor: "#ffffff",
    margin: "20px auto",
  };
  const inputStyle = {
    marginTop: 20,
    backgroundColor: "#ffffff",
  };
  const singInStyle = {
    height: "60px",
  };
  return (
    <Grid style={style}>
      <Paper elevation={10} style={paperStyle}>
        <TextField
          onChange={(e) => {
            setMail(e.target.value);
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
