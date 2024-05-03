import { Grid, Skeleton, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/styledComponents";
import ForumIcon from "@mui/icons-material/Forum";

const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton variant="reactangular" height={"100vh"} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        {/* <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={"5rem"} />
          ))}
        </Stack> */}
        <Box
          bgcolor={"rgb(242, 242, 242) "}
          height={"100vh"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <ForumIcon
            sx={{
              height: "10rem",
              width: "10rem",
              opacity: "0.2",
            }}
          />
          <Typography variant="h2" color={"lightgray"}>
            BaatKarlo
          </Typography>
          <Typography variant="h5" color={"lightgray"}>
            Chat App....
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        height={"100%"}
      >
        <Skeleton variant="reactangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={12}
        height={12}
        style={{ animationDelay: "0.1s" }}
      />
      <BouncingSkeleton
        variant="circular"
        width={12}
        height={12}
        style={{ animationDelay: "0.2s" }}
      />
      <BouncingSkeleton
        variant="circular"
        width={12}
        height={12}
        style={{ animationDelay: "0.3s" }}
      />
      <BouncingSkeleton
        variant="circular"
        width={12}
        height={12}
        style={{ animationDelay: "0.4s" }}
      />
    </Stack>
  );
};

export { TypingLoader, LayoutLoader };
