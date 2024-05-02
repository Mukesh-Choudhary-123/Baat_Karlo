import { useFetchData } from "6pp";
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Adminlayout from "../../components/layout/Adminlayout";
import { LayoutLoader } from "../../components/layout/Loaders";
import { DoughnutChart, LineChart } from "../../components/specific/Chart";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/styledComponents";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );
  const [stats, setStats] = useState(null);

  console.log(data);
  useEffect(() => {
    if (data) {
      setStats(data.messages);
    }
  }, [data]);

  useErrors([{ isError: error, error: error }]);

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
      <Widget title={"Users"} value={stats?.usersCount} Icon={<Person />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<Group />} />
      <Widget
        title={"Message"}
        value={stats?.messagesCount}
        Icon={<Message />}
      />
    </Stack>
  );

  return (
    <Adminlayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container component={"main"}>
          {Appbar}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            // justifyContent={"center"}
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
                maxWidth: "35rem",
                height: "22rem",
              }}
            >
              <Typography margin={"1rem 1rem"} variant="h5">
                Last Messages
              </Typography>
              <LineChart value={stats?.messagesChart || []} />
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                width: "100%",
                height: "22rem",
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
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
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
      )}
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
