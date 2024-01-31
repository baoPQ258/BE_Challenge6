import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Server is ready!");
});
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("messageReceived", (msg) => {
    io.emit("messageReceived", msg);
  });
  socket.on("create group", (uid, title) => {
    io.emit("fetch group");
  });
});
app.use(notFound);
app.use(errorHandler);
server.listen(port, () => {
  console.log(`Server start in port ${port}`);
});
