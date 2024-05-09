import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
  },
});
export default chatSlice;

export const {} = chatSlice.actions;
