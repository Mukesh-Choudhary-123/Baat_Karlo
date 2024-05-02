import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
  addMembersValidator,
  deleteChatValidator,
  getChatDetailsValidator,
  getMessagesValidator,
  leaveGroupValidator,
  newGroupChatValidator,
  removeMemberValidator,
  renameGroupValidator,
  sendAttachmentsValidator,
  vaildateHandler,
} from "../lib/validators.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupChatValidator(), vaildateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembersValidator(), vaildateHandler, addMembers);

app.put(
  "/removemember",
  removeMemberValidator(),
  vaildateHandler,
  removeMember
);

app.delete("/leave/:id", leaveGroupValidator(), vaildateHandler, leaveGroup);

app.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  vaildateHandler,
  sendAttachments
);

app.get("/message/:id", getMessagesValidator(), vaildateHandler, getMessages);

app
  .route("/:id")
  .get(getChatDetailsValidator(), vaildateHandler, getChatDetails)
  .put(renameGroupValidator(), vaildateHandler, renameGroup)
  .delete(deleteChatValidator(), vaildateHandler, deleteChat);

export default app;
