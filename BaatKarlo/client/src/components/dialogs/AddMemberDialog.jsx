import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selecteMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
      </Stack>
      <Stack spacing={"1rem"}>
        {members.length > 0 ? (
          members.map((i) => (
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
