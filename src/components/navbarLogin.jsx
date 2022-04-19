import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Typography,
} from "@mui/material";

const NavbarLogin = () => {
  const items = [
    { text: "ABOUT US", img: "/img/persone.png" },
    { text: "FAQ", img: "/img/question.png" },
    { text: "SECURITY", img: "/img/security.png" },
    { text: "HOME", img: "/img/home.png" },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Avatar
              src="/img/logo_dark.png"
              variant="rounded"
              sx={{ width: 175 }}
            />
          </Box>
          {items.map((item) => (
            <Button key={item.text}>
              <Avatar src={item.img} variant="rounded" />
              <Typography color="black">{item.text}</Typography>
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarLogin;
