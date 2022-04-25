import React, { useState, useLayoutEffect } from "react";

import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
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

const Home = ({ style }) => {
  const [width] = useWindowSize();
  const paperStyle = {
    padding: 20,
    width: "90%",
    backgroundColor: "#ffffff",
    margin: "auto",
  };
  return (
    <Grid style={style} container>
      <Card style={paperStyle} sx={{ display: "flex" }} elevation={10}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" fontSize={30}>
              Our objective:
            </Typography>
            <Typography fontSize={20} component="div">
              <br />
              Help our customers with intuitive software, easy to use, guarantee
              of reliability and efficiency. All the our products are developed
              ad hoc, ensuring a constant update since their creation carried
              out according to the specific requests and needs of our customers.
              Our company it constantly evolves and updates its employees on a
              monthly basis training courses created for the development of the
              skills of our personal. Esep offers a wide range of software
              products for companies working in the field of public utilities,
              gas, electricity and water. Our softwares are flexible and
              adaptable to every need, solving every type of detail in detail
              request from our customers.
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
              image="/img/solar_pannel.png"
              alt="solar pannel"
            />
          </Box>
        )}
      </Card>
    </Grid>
  );
};

export default Home;
