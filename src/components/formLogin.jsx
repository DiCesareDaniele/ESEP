// import { createTheme } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from "@mui/material";

const FormLogin = ({ props, style }) => {
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 500,
    margin: "20px auto",
  };
  const inputStyle = {
    "margin-top": 20,
  };
  const singInStyle = {
    height: "60px",
  };
  return (
    <Grid style={style}>
      <Paper elevation={10} style={paperStyle}>
        <TextField
          label="Email"
          placeholder="Enter your Email"
          fullWidth
          required
          style={inputStyle}
        ></TextField>
        <TextField
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
        />
        <Button type="submit" color="primary" style={singInStyle} fullWidth>
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
