import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { myChats } from "../thunks/User";
const initialState = {
  contact: {},
};

const userSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(myChats.fulfilled, (state, action) => {})
      .addCase(myChats.rejected, (state, action) => {});
  },
});
export default userSlice;

export const { contact } = userSlice.actions;
