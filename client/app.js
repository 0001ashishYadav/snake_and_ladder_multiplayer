const socket = io("ws://localhost:5000");

const canvasSize = 600;
const boxSize = canvasSize / 10; // Assuming a 10x10 grid for the game

const canvas = document.getElementById("gameCanvas");
canvas.width = canvasSize;
canvas.height = canvasSize;
canvas.style.backgroundImage = "url('../map.jpg')";
const ctx = canvas.getContext("2d");

socket.on("info", (msg) => {
  console.log(msg);
});

socket.emit("info", "hello from client");
