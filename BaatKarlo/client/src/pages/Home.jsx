import React from "react";
import Applayout from "../components/layout/Applayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box bgcolor={"gray"} height={"100%"}>
      <Typography padding={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to Chat
      </Typography>
    </Box>
  );
};

export default Applayout()(Home);
