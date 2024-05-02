import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import {
  useAddGroupMembersMutation,
  useAvilableFriendsQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvilableFriendsQuery(chatId);

  const [addember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  // const [members, setMembers] = useState(sampleUsers);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selecteMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addember("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
      </Stack>
      <Stack spacing={"1rem"}>
        {isLoading ? (
          <Skeleton />
        ) : data?.friends?.length > 0 ? (
          data?.friends?.map((i) => (
            <UserItem
              key={i._id}
              user={i}
              handler={selecteMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Friends</Typography>
        )}
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        padding={"1rem"}
      >
        <Button color="error" variant="outlined" onClick={closeHandler}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isLoadingAddMember}
          onClick={addMemberSubmitHandler}
        >
          Submit
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
