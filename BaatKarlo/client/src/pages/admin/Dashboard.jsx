import React from "react";
import Adminlayout from "../../components/layout/Adminlayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import moment from "moment";
import {
  SearchField,
  CurveButton,
} from "../../components/styles/styledComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Chart";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={2}
      sx={{
        padding: "1rem 2rem",
        margin: "1rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings sx={{ fontSize: "1.5rem" }} />
        <SearchField />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd,D MMMM YYYY")}
        </Typography>
        <Notifications />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"1rem"}
      justifyContent={"space-between"}
      margin={"1rem 0"}
    >
      <Widget title={"Users"} value={30} Icon={<Person />} />
      <Widget title={"Chats"} value={20} Icon={<Group />} />
      <Widget title={"Message"} value={320} Icon={<Message />} />
    </Stack>
  );

  return (
    <Adminlayout>
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          sx={{
            gap: "1rem",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "30rem",
              height: "20rem",
            }}
          >
            <Typography margin={"1rem 1rem"} variant="h5">
              Last Messages
            </Typography>
            <LineChart value={[0, 15, 5, 0, 23, 5, 0]} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              width: "100%",
              height: "20rem",
              maxWidth: "20rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: { xs: "100%", sm: "50%" },
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[23, 66]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group /> <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </Adminlayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "1rem",
      margin: "1rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon} <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
