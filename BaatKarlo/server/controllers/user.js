import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOption, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);

  const avatar = {
    public_id: "sddfgsa",
    url: "asdasdf",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });
  sendToken(res, user, 201, "User Created");
};
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));

  sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
});
const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("baatkarlo-token", "", { ...cookieOption, maxAge: 0 })
    .json({
      success: true,
      messsage: "Logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;
  return res.status(200).json({
    success: true,
    messsage: name,
  });
});

export { login, newUser, getMyProfile, logout, searchUser };
