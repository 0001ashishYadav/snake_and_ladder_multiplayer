import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

let clients = [];

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("info", "hello from server");
  socket.on("info", (msg) => {
    console.log(msg);
  });

  socket.on("join", (name) => {
    if (!name || name === null) {
      return;
    }
    console.log("a user connected");

    clients.push({ name, id: socket.id });
    io.emit("join", clients);
    console.log(clients);
  });

  socket.on("play", () => {
    const diceValue = Math.ceil(Math.random() * 6);
    io.emit("play", diceValue);
  });

  socket.on("disconnect", (msg) => {
    console.log(msg);
    console.log(socket.id);

    clients = clients.filter((client) => client.id !== socket.id);
    io.emit("join", clients);
    console.log(clients);
  });
});

httpServer.listen(5000, (e) => {
  if (e) {
    return console.log(e);
  }
  console.log("server started on 5000");
});
