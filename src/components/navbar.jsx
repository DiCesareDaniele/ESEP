import React, { useLayoutEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const Navbar = ({ items }) => {
  if (items === undefined) {
    items = [];
  }
  const [width] = useWindowSize();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button onClick={() => navigate("/")}>
              <Avatar
                src="/img/logo_dark.png"
                variant="rounded"
                sx={{ width: 160 }}
              />
            </Button>
          </Box>
          {width > 400 &&
            items.map((item) => (
              <Button key={item.text} onClick={() => navigate(item.url)}>
                <Avatar src={item.img} variant="rounded" />
                {width > 600 && (
                  <Typography color="black">{item.text}</Typography>
                )}
              </Button>
            ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
