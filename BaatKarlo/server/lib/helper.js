export const getOtherMember = (members, userId) =>
  members.find((members) => members._id.toString() !== userId.toString());
