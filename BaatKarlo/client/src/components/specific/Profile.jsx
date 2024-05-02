import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
const Profile = ({ user }) => {
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
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: "12rem",
          height: "12rem",
          objectFit: "contain",
          border: "2px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />;
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      ;
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      ;
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
      ;
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack marginLeft={"0.6rem"}>
      <Typography variant="body1" color={"lightblue"}>
        {text}
      </Typography>
      <Typography color={"white"} variant="caption">
        ({heading})
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
