import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

const myChats = createAsyncThunk("user/", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/chat/my`, {
      withCredentials: true,
    });

    return data.admin;
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

export { myChats };
