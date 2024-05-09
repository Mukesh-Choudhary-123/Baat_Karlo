import { Button, Dialog, DialogTitle, Stack } from "@mui/material";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../utils/socket";
import { INCOMING_CALL } from "../../constants/events";
import { setIsCall } from "../../redux/reducers/misc";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CallNotification = ({ isCall }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setIsCall(false));

  const callAcceptHandle = () => {
    console.log("callAcceptHandle");
    navigate("/video");
    handleClose();
  };

  return (
    <Dialog open={isCall} onClose={handleClose}>
      <Stack p={"2rem"} width={"20rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Incoming Call...</DialogTitle>
      </Stack>
      <Stack spacing={"1rem"}>{/* { Avatar} */}</Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        padding={"1rem"}
      >
        <Button color="error" variant="contained" onClick={handleClose}>
          Decline
        </Button>
        <Link to={"/video"}>
          <Button
            color="success"
            variant="contained"
            onClick={callAcceptHandle}
          >
            Accept
          </Button>
        </Link>
      </Stack>
    </Dialog>
  );
};

export default CallNotification;
