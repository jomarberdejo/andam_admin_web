import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"; // Import socket.io

import reportRouter from "./routes/report.router.js";
import authRouter from "./routes/auth.router.js";
import { verifyUser } from "./middleware/middleware.js";
import userRouter from "./routes/user.router.js";
import contactRouter from "./routes/contact.router.js";
import entryRouter from "./routes/entry.router.js";
import residentRouter from "./routes/resident.router.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT_NUM || 3000;

app.use(cors());
app.use(express.json());

// app.use('/api/auth', verifyUser, authRouter)
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);
app.use("/api/resident", residentRouter);
app.use("/api/report", reportRouter);
app.use("/api/contact", contactRouter);
app.use("/api/entry", entryRouter);
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_BASE_URL,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.id);
  socket.on("newUser", (data) => {
    io.emit("newLogin", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
