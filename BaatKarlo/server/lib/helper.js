import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, userId) =>
  members.find((members) => members._id.toString() !== userId.toString());

export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user._id.toString()));
  return sockets;
};
