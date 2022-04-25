import React, { useState, useLayoutEffect } from "react";

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Link,
  Box,
} from "@mui/material";

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
      <Card style={paperStyle} sx={{ display: "flex" }} elevation={10}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" fontSize={40}>
              ABOUT US:
            </Typography>
            <Typography fontSize={20} component="div">
              <Typography fontSize={20}>
                <br /> Esep is a company of professionals always updated on the
                latest developments in the technological and IT market. <br />
                Design and build innovative software for companies that want to
                explore the newest technologies to improve their business.
                <br /> All services offered are built by adapting to the needs
                of companies.
                <br /> Esep is equipped with its own internal software
                development units for the implementation of even complex
                projects, ranging in the IoT.
                <br />
                <br />
                The project ESEPay starts due to the need of semplifing the
                payments and managment of bills.
                <br />
                It all started from the brilliant minds of the engineers:
                <br />
                Di Cesare Daniele, Nicolas Malvezzi, Scardino Riccardo, Balzo
                Federico and Nicoló Rubino (contacts in&nbsp;
                <Link href="/faq">faq</Link> page)
                <br />
                <br />
                <br />
              </Typography>
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
        {width > 850 && (
          <Box>
            <Box style={{ height: 50 }}></Box>
            <CardMedia
              component="img"
              sx={{
                width: width > 1100 ? 500 : Math.trunc(width / 3),
                height: width > 1100 ? 300 : Math.trunc(width / 4),
              }}
              image="/img/giga_chad.png"
              alt="giga chad"
            />
          </Box>
        )}
      </Card>
    </Grid>
  );
};

export default About;
