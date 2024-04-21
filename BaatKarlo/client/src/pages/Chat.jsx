import React, { useRef } from "react";
import Applayout from "../components/layout/Applayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/styledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
const Chat = () => {
  const containerRef = useRef(null);
  const user = {
    _id: "sdfsdfsdf",
    name: "Mukesh Choudhary",
  };
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        bgcolor={grayColor}
        // bgcolor={"rgb(242, 242, 242)"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "3px" },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
          "&::-webkit-scrollbar-thumb": { background: "#888" },
        }}
        spacing={"1rem"}
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"0.45rem"}
          alignItems={"center"}
          position={"relative"}
          bgcolor={"rgba(100, 124, 141, 1)"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.2rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder="Type Message Here..." />
          <IconButton
            type="submit"
            sx={{
              bgcolor: "rgb(52, 152, 219)",
              color: "white",
              marginLeft: "1rem",
              padding: "0.6rem",
              "&:hover": {
                bgcolor: "rgb(52, 152, 219,0.5)",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default Applayout()(Chat);
