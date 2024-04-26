import express from "express";
import {
  acceptFriendRequest,
  getAllNotification,
  getMyFriends,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptFriendRequestValidator,
  loginValidator,
  registerValidator,
  sendFriendRequestValidator,
  vaildateHandler,
} from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), vaildateHandler, newUser);

app.post("/login", loginValidator(), vaildateHandler, login);

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.get("/logout", logout);

app.get("/search", searchUser);

app.put(
  "/sendrequest",
  sendFriendRequestValidator(),
  vaildateHandler,
  sendFriendRequest
);
app.put(
  "/acceptrequest",
  acceptFriendRequestValidator(),
  vaildateHandler,
  acceptFriendRequest
);

app.get("/notification", getAllNotification);

app.get("/friends", getMyFriends);

export default app;
