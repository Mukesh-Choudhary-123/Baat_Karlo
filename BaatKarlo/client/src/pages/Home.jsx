import ForumIcon from "@mui/icons-material/Forum";
import { Box, Typography } from "@mui/material";
import React from "react";
import Applayout from "../components/layout/Applayout";
const Home = () => {
  return (
    <Box
      bgcolor={"rgb(242, 242, 242) "}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <ForumIcon
        sx={{
          height: "10rem",
          width: "10rem",
        }}
      />
      <Typography variant="h2">BaatKarlo</Typography>
      <Typography variant="h6">Select a friend to Chat...</Typography>
    </Box>
  );
};

export default Applayout()(Home);
// const HomeWithLayout = Applayout(Home);
// export default HomeWithLayout;
