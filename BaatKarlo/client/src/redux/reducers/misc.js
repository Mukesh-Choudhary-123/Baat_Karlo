import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isCallHistory: false,
  isCall: false,
  isMobileMenuFriend: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState: {},
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsCallHistory: (state, action) => {
      state.isCallHistory = action.payload;
    },
    setIsCall: (state, action) => {
      state.isCall = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsMobileMenuFriend: (state, action) => {
      state.isMobileMenuFriend = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
  },
});
export default miscSlice;

export const {
  setIsAddMember,
  setIsDeleteMenu,
  setIsFileMenu,
  setIsMobileMenuFriend,
  setIsNewGroup,
  setIsNotification,
  setIsCallHistory,
  setIsCall,
  setIsSearch,
  setSelectedDeleteChat,
  setUploadingLoader,
} = miscSlice.actions;
