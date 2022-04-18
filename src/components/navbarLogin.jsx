import * as React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Grid,
  ImageButton,
  ImageSrc,
} from "@mui/material";

const NavbarLogin = () => {
  const items = [
    { text: "ABOUT US", img: "/img/img1.png" },
    { text: "FAQ", img: "/img/img2.jpg" },
    { text: "HOME", img: "/img/img3.png" },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ImageButton
            sx={{ flexGrow: 1 }}
            focusRipple
            style={{
              width: "100px",
            }}
          >
            <ImageSrc style={{ backgroundImage: "/img/logo.png" }} />
          </ImageButton>
          {items.map((item) => (
            <Grid key={item.text} alignItems="center">
              <Avatar src={item.img} variant="rounded" />
              <Button color="inherit">{item.text}</Button>
            </Grid>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarLogin;
