import express from "express";
import { allUser } from "../controllers/admin.js";

const app = express.Router();

app.get("/");

app.post("/verify");

app.get("/logout");

app.get("/user", allUser);
app.get("/chats");
app.get("/messages");

app.get("/status");

export default app;
