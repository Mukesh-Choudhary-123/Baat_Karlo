import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { getSocket } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import { useChatDetailsQuery } from "../redux/api/api";
import { useSelector } from "react-redux";
import { CallEnd, VideoCall } from "@mui/icons-material";

const Video = () => {
  const socket = getSocket();
  const navigate = useNavigate();

  const { isCall } = useSelector((state) => state.misc);
  // console.log("IS CALL ", isCall);

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [incomingcall, setIncomingCall] = useState();
  const [members, setMembers] = useState();

  const handleUserJoined = useCallback(
    async ({ chatId, userId, reciverSocketId, members }) => {
      setRemoteSocketId(reciverSocketId);
      setMembers(members);
    },
    []
  );

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer, members });
    navigate("/video");
    setMyStream(stream);
    setIncomingCall(true);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      if (from && offer) {
        setRemoteSocketId(from);

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMyStream(stream);
        console.log(`Incoming Call`, from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
      } else {
        console.log("the data is not getting ");
      }
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    setIncomingCall(true);
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleEndCall = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }
    const info = "Call Cut By ";
    socket.emit("call:decline", { remoteStream, info, sockets: socket.id });
    setIncomingCall(false); // Reset incoming call state
    setRemoteSocketId(null); // Reset remote socket ID
  }, [myStream, remoteStream]);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("call:decline", handleEndCall);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("call:decline", handleEndCall);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const goback = () => navigate(`/`);
  return (
    <>
      <Container>
        <AppBar
          sx={{
            bgcolor: "rgb(52, 152, 219)",
            height: "4rem",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            // alignItems={"center"}
            marginLeft={"1.5rem"}
            paddingTop={"0.5rem"}
          >
            <ForumIcon
              sx={{
                marginLeft: "1.6rem",
              }}
            />
            <Typography variant="h7">Baat Karlo</Typography>
          </Box>
          <Typography variant="h5" textAlign={"center"} marginTop={"-2.5rem"}>
            Video Call
          </Typography>
        </AppBar>

        <Stack
          sx={{
            paddingTop: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {remoteSocketId ? (
            <Typography variant="h6" marginTop={"0.5rem"} textAlign={"center"}>
              Connected
            </Typography>
          ) : (
            <>
              <Typography variant="h4" textAlign={"center"} marginTop={"14rem"}>
                Try Again !
              </Typography>

              <Typography
                variant="h7"
                textAlign={"center"}
                marginTop={"1rem"}
                onClick={goback}
              >
                go back 👈
              </Typography>
            </>
          )}
          {remoteSocketId && !myStream && (
            <IconButton
              onClick={handleCallUser}
              sx={{
                height: "2.5rem",
                width: "2.5rem",
                bgcolor: "rgb(52, 152, 219)",
                color: "white",
                marginLeft: "1rem",
                marginTop: "1rem",
                padding: "0.6rem",
                "&:hover": {
                  bgcolor: "green",
                },
              }}
            >
              <VideoCall />
            </IconButton>
          )}

          {myStream && (
            <Stack
              bgcolor={"lightblue"}
              borderRadius={7}
              justifyContent={"center"}
              padding={"1rem"}
            >
              <Typography variant="h6" color={"GrayText"}>
                You
              </Typography>
              <ReactPlayer
                playing={true}
                muted={false}
                height="100px"
                width="200px"
                url={myStream}
              />
            </Stack>
          )}

          {remoteStream && (
            <Stack bgcolor={"lightgreen"} borderRadius={3} padding={"1rem"}>
              <Typography textAlign={"end"} color={"GrayText"} variant="h6">
                Your Firend
              </Typography>
              <ReactPlayer
                playing={true}
                muted={false}
                height="20rem"
                width="20rem"
                url={remoteStream}
              />
            </Stack>
          )}

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "s",
            }}
          >
            {myStream && (
              <IconButton
                onClick={sendStreams}
                sx={{
                  height: "2.5rem",
                  width: "2.5rem",
                  bgcolor: "green",
                  color: "white",
                  marginLeft: "1rem",
                  marginTop: "1rem",
                  padding: "0.6rem",
                  "&:hover": {
                    bgcolor: "lightgreen",
                  },
                }}
              >
                <CallEnd />
              </IconButton>
            )}
            {myStream && (
              <IconButton
                onClick={handleEndCall}
                sx={{
                  height: "2.5rem",
                  width: "2.5rem",
                  bgcolor: "red",
                  color: "white",
                  marginLeft: "1rem",
                  marginTop: "1rem",
                  padding: "0.6rem",
                  "&:hover": {
                    bgcolor: "black",
                  },
                }}
              >
                <CallEnd />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Video;
