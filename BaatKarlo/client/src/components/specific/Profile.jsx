import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
const Profile = () => {
  return (
    <Stack
      spacing={"2rem"}
      direction={"column"}
      alignItems={"center"}
      overflow={"auto"}
      height={"100%"}
      sx={{
        "&::-webkit-scrollbar": { width: "0px" },
      }}
    >
      <Avatar
        sx={{
          width: "12rem",
          height: "12rem",
          objectFit: "contain",
          border: "2px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"🤘 Always Be Happy ❤"} />;
      <ProfileCard
        heading={"Username"}
        text={"mukesh637"}
        Icon={<UserNameIcon />}
      />
      ;
      <ProfileCard
        heading={"Name"}
        text={"Mukesh Choudhary"}
        Icon={<FaceIcon />}
      />
      ;
      <ProfileCard
        heading={"Joined"}
        text={moment("2023-03-11T18:30:00.000Z").fromNow()}
        Icon={<CalendarIcon />}
      />
      ;
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"column"}
    alignItems={"center"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        ({heading})
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
