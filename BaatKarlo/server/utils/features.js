import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbname: "BaatKarlo" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("baatkarlo-token", token, cookieOption).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emiiting Event", event);
};
export { connectDB, sendToken, cookieOption, emitEvent };
