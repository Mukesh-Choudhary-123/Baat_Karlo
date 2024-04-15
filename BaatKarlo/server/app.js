import express from "express";
import useRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/user.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

// createUser(10);

const app = express();

//Use Middlewares Here
app.use(express.json());
app.use(cookieParser());

app.use("/user", useRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
