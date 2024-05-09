import {
  Add,
  Delete,
  Done,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { Link } from "../components/styles/styledComponents";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";
import { motion } from "framer-motion";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

//=================================================================================

const Groups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatId = useSearchParams()[0].get("group");

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);

  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
    { isError: groupDetails.isError, error: groupDetails.error },
  ];
  useErrors(errors);

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updaing Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name  ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  // const members = groupDetails?.data?.chat?.members || [];

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            left: "1rem",
            top: "1.1%",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.6)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"1rem"}
        padding={"2rem"}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
              <Done />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h5">{groupName}</Typography>
            <IconButton
              onClick={() => setIsEdit(true)}
              disabled={isLoadingGroupName}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        color="error"
        variant="outlined"
        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <>
      <Header />
      <Grid container height={"calc(100vh - 4rem)"} overflow={"hidden"}>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            "&::-webkit-scrollbar": { width: "2px" },
            "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { background: "#888" },
          }}
          sm={3}
          bgcolor={"lightgray"}
          textAlign={"center"}
          overflow={"auto"}
        >
          <Typography
            fontSize={"1.3rem"}
            textAlign={"center"}
            bgcolor={"rgb(52, 152, 219)"}
            paddingTop={"1rem"}
            paddingBottom={"1rem"}
          >
            All Groups
          </Typography>
          <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem",
          }}
        >
          {IconBtns}
          {groupName ? (
            <>
              {GroupName}
              <Typography
                // margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
                fontWeight={"600"}
                fontStyle={"italic"}
              >
                All Members
              </Typography>

              <Stack
                maxWidth={"40rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"1rem"}
                // bgcolor={"rgba(0,0,0,0.1)"}
                height={"50vh"}
                borderRadius={"1rem"}
                overflow={"auto"}
                marginBottom={"1rem"}
                sx={{
                  "&::-webkit-scrollbar": { width: "4px" },
                  "&::-webkit-scrollbar:hover": { width: "6px" },
                  "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
                  "&::-webkit-scrollbar-thumb": { background: "#888" },
                }}
              >
                {isLoadingRemoveMember ? (
                  <CircularProgress />
                ) : (
                  members.map((i) => (
                    <UserItem
                      user={i}
                      key={i._id}
                      isAdded
                      styling={{
                        boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                        padding: "1rem 1rem",
                        borderRadius: "1rem",
                      }}
                      handler={removeMemberHandler}
                    />
                  ))
                )}
              </Stack>

              {ButtonGroup}
            </>
          ) : (
            <>
              <Box
                // bgcolor={"rgb(242, 242, 242) "}
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
                <Typography variant="h6">
                  Select a Group for Manage...
                </Typography>
              </Box>
            </>
          )}
        </Grid>

        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )}

        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )}

        <Drawer
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            "&::-webkit-scrollbar": { width: "2px" },
            "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { background: "#888" },
          }}
        >
          <Typography
            fontSize={"1.3rem"}
            fontWeight={"600"}
            textAlign={"center"}
            bgcolor={"rgb(52, 152, 219)"}
            paddingTop={"1rem"}
            paddingBottom={"1rem"}
          >
            All Groups
          </Typography>
          <GroupsList
            w={"65vw"}
            myGroups={myGroups?.data?.groups}
            chatId={chatId}
          />
        </Drawer>
      </Grid>
    </>
  );
};

//#region GroupsList

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <motion.div
    initial={{ opacity: 0, x: "-100%" }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 }}
  >
    <Stack
      width={w}
      sx={{
        height: "100vh",
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  </motion.div>
);

//#region GroupListItem

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography paddingLeft={"1rem"}>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
