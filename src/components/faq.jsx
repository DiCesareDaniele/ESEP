import React, { useState, useLayoutEffect, useEffect } from "react";

import { Typography, Paper, Grid, Link } from "@mui/material";

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

const Faq = ({ style }) => {
  const paperStyle = {
    padding: 20,
    width: "90%",
    backgroundColor: "#ffffff",
    margin: "auto",
  };
  const [smallFontSize, setSmallFontSize] = useState(10);
  const [bigFontSize, setBigFontSize] = useState(15);
  const [width] = useWindowSize();
  useEffect(() => {
    if (width < 600) {
      setSmallFontSize(10);
      setBigFontSize(15);
    } else {
      setSmallFontSize(20);
      setBigFontSize(30);
    }
  }, [width]);
  return (
    <Grid style={style} container>
      <Paper elevation={10} style={paperStyle}>
        <Typography fontSize={40} textAlign="center">
          FAQ
        </Typography>
        <br />
        <br />
        <Typography fontSize={bigFontSize}>Any problems?</Typography>
        &emsp;
        <Link href="#" fontSize={smallFontSize}>
          Go to our informative section.
        </Link>
        <br />
        &emsp;
        <Link href="#faq" fontSize={smallFontSize}>
          Or search in freqently asked questions.
        </Link>
        <br />
        <br />
        <br />
        <Typography fontSize={bigFontSize}>Useful contacts</Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;General reference center:&nbsp;
          <Link href="#">+3938234234</Link>
        </Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;Problems report:&nbsp;
          <Link href="#">+397857644</Link>
        </Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;Site mail:&nbsp;
          <Link href="#">esep.payments@gmail.com</Link>
        </Typography>
        <br />
        <br />
        <Typography fontSize={bigFontSize}>Founders mails</Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;Di Cesare Daniele:&nbsp;
          <Link href="#">dicesaredaniele7@gmail.com</Link>
        </Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;Malvezzi Nicolas:&nbsp;
          <Link href="#">18682@studenti.marconiverona.edu.it</Link>
        </Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;Riccardo Scardino:&nbsp;
          <Link href="#">riccardoscardino01@gmail.com</Link>
        </Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;Balzo Federico:&nbsp;
          <Link href="#">balzofederico@gmail.com</Link>
        </Typography>
        <Typography fontSize={smallFontSize}>
          &emsp;Nicoló Rubino:&nbsp;
          <Link href="#">18761@studenti.marconiverona.edu.it</Link>
        </Typography>
        <br />
        <br />
        <Typography fontSize={bigFontSize} id="faq">
          Frequently asked questions
        </Typography>
        <Paper style={{ backgroundColor: "#dddddd" }}>
          <Typography fontSize={smallFontSize}>
            <span style={{ backgroundColor: "#ffcc00" }}>
              Why my pasta wont cook?
            </span>
          </Typography>
          <Typography fontSize={smallFontSize}>
            <span style={{ backgroundColor: "#ffff00" }}>
              We don't know. This is not a cooking website!
            </span>
          </Typography>
        </Paper>
        <br />
        <Paper style={{ backgroundColor: "#dddddd" }}>
          <Typography fontSize={smallFontSize}>
            <span style={{ backgroundColor: "#ffcc00" }}>
              I can't pay the bills?
            </span>
          </Typography>
          <Typography fontSize={smallFontSize}>
            <span style={{ backgroundColor: "#ffff00" }}>
              Have you tried alt+f4 ;)
            </span>
          </Typography>
        </Paper>
      </Paper>
    </Grid>
  );
};

export default Faq;
