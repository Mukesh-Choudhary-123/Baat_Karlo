import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const vaildateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(",");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const newGroupChatValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 3, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMembersValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1 })
    .withMessage("Member must be select"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("userId", "Please Enter User ID").notEmpty(),
];

const leaveGroupValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
];

const getMessagesValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
];

const getChatDetailsValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
];

const renameGroupValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter Name").notEmpty(),
];

const deleteChatValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
];

const sendFriendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptFriendRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter secret Key").notEmpty(),
];

export {
  registerValidator,
  vaildateHandler,
  loginValidator,
  newGroupChatValidator,
  addMembersValidator,
  removeMemberValidator,
  leaveGroupValidator,
  sendAttachmentsValidator,
  getMessagesValidator,
  getChatDetailsValidator,
  renameGroupValidator,
  deleteChatValidator,
  sendFriendRequestValidator,
  acceptFriendRequestValidator,
  adminLoginValidator,
};
