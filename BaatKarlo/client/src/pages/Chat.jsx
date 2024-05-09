import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Call as CallIcon,
  Duo as DuoIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Await, useNavigate } from "react-router-dom";
import FileMenu from "../components/dialogs/FileMenu";
import Applayout from "../components/layout/Applayout";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/styledComponents";
import { grayColor } from "../constants/color";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  OFFER_CALL,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { setIsCall, setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../utils/socket";

//
//
//
////++++++++++++++++++ Chat Page +++++++++++++++++++++++++//
//
//
//

const Chat = ({ chatId, user }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const socket = getSocket();
  // console.log(socket.id);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const groupChat = chatDetails?.data?.chat?.groupChat;

  // const VoiceCallHandler = (e) => {
  //   console.log("VoiceCallHandler Button");
  //   navigate("/voice");
  // };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const handleVideoCall = async () => {
    console.log("handleVideoCall");
    await socket.emit(OFFER_CALL, { members, chatId, userId: user._id });
    setIsCall(true);
    navigate("/video"); // Redirect to video call page
  };

  //+++++++++=+=+=+=+=+=+=+==++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIAmTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]), setMessage(""), setOldMessages([]), setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  // useEffect(() => {
  //   if (!chatDetails.data?.chat) return navigate("/");
  // }, [chatDetails.data]);

  // useEffect(() => {
  //   if (!chatDetails) return navigate("/");
  // }, [chatDetails]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const newMessagesHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "sudhfuyhuisudhifhsdigdfg",
          name: "Admin",
        },
        chat: chatId,
        createAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  const imageUrl = "https://mcdn.wallpapersafari.com/medium/27/32/jt4AoG.jpg";

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
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
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        spacing={"1rem"}
      >
        {allMessages?.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
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
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />
          <Tooltip title={"Send"}>
            <IconButton
              type="submit"
              sx={{
                bgcolor: "rgb(52, 152, 219)",
                color: "white",
                marginLeft: "1rem",
                // padding: "0.6rem",
                "&:hover": {
                  bgcolor: "rgb(52, 152, 219,0.5)",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>

          {!groupChat ? (
            <>
              {/* <Tooltip title={"Voice Call"}>
                <IconButton
                  onClick={VoiceCallHandler}
                  sx={{
                    bgcolor: "rgb(52, 152, 219)",
                    color: "white",
                    marginLeft: "1rem",
                    // padding: "0.6rem",
                    "&:hover": {
                      bgcolor: "green",
                    },
                  }}
                >
                  <CallIcon />
                </IconButton>
              </Tooltip> */}

              <Tooltip title={"Video Call"}>
                <IconButton
                  onClick={handleVideoCall}
                  sx={{
                    bgcolor: "rgb(52, 152, 219)",
                    color: "white",
                    marginLeft: "1rem",
                    // padding: "0.6rem",
                    "&:hover": {
                      bgcolor: "green",
                    },
                  }}
                >
                  <DuoIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default Applayout()(Chat);
