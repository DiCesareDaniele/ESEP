import React, { useState, useLayoutEffect } from "react";

import { Typography, Paper, Grid, Link, Box } from "@mui/material";

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

const About = ({ style }) => {
  const paperStyle = {
    padding: 20,
    width: "90%",
    backgroundColor: "#ffffff",
    margin: "auto",
  };
  const [width] = useWindowSize();
  return (
    <Grid style={style} container>
      <Paper elevation={10} style={paperStyle}>
        <Typography fontSize={40} textAlign="center">
          ABOUT
        </Typography>
        <Typography fontSize={20}>
          <br />
          Esep is a company of professionals always updated on the latest
          developments in the technological and IT market. <br />
          Design and build innovative software for companies that want to
          explore the newest technologies to improve their business.
          <br /> All services offered are built by adapting to the needs of
          companies.
          <br /> Esep is equipped with its own internal software development
          units for the implementation of even complex projects, ranging in the
          IoT.
          <br />
          <br />
          The project ESEPay starts due to the need of semplifing the payments
          and managment of bills.
          <br />
          It all started from the brilliant minds of the engineers:
          <br />
          Di Cesare Daniele, Nicolas Malvezzi, Scardino Riccardo, Balzo Federico
          and Nicoló Rubino (contacts in&nbsp;
          <Link href="/faq">faq</Link> page)
          <br />
          <br />
          <br />
        </Typography>
        <Grid container justifyContent="center">
          <Box>
            <img
              src="/img/about_bg.jpg"
              alt="about"
              width={width > 750 ? 500 : Math.trunc((width * 6) / 10)}
            />
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default About;
