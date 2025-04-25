// // // 



// // // server.js

// // const express = require("express");
// // const http = require("http");
// // const socketIo = require("socket.io");

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server);

// // // Variable to track whether the canvas should be cleared
// // let clearState = false;

// // app.use(express.static("public"));

// // io.on("connection", (socket) => {
// //   console.log(`${socket.id} connected`);

// //   // Listen for drawing data
// //   socket.on("draw", (data) => {
// //     socket.broadcast.emit("draw", data);
// //   });

// //   // Handle the "clear" event from clients
// //   socket.on("clear", () => {
// //     clearState = true;  // Mark the server as cleared
// //     io.emit("clear");   // Broadcast to all clients to clear their canvas
// //   });

// //   // When a new client connects, let them know the current clear state
// //   if (clearState) {
// //     socket.emit("clear");  // Broadcast clear event on page load for new connections
// //   }

// //   socket.on("disconnect", () => {
// //     console.log(`${socket.id} disconnected`);
// //   });
// // });

// // const PORT = process.env.PORT || 8081;
// // server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// // server.js
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Variable to track whether the canvas should be cleared
// let clearState = false;

// app.use(express.static("public"));

// io.on("connection", (socket) => {
//   console.log(`${socket.id} connected`);

//   // Emit the current state of the clear canvas on new connection
//   if (clearState) {
//     socket.emit("clear");
//   }

//   // Handle the "draw" event from the client
//   socket.on("draw", (data) => {
//     socket.broadcast.emit("draw", data);  // Emit to all clients except the sender
//   });

//   // Handle the "clear" event
//   socket.on("clear", () => {
//     clearState = true;  // Set clear state to true on the server
//     io.emit("clear");   // Broadcast clear to all connected clients
//   });

//   socket.on("disconnect", () => {
//     console.log(`${socket.id} disconnected`);
//   });
// });

// const PORT = process.env.PORT || 8081;
// server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


let express = require("express");
let app = express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

let connections = [];

io.on("connect", (socket) => {
  connections.push(socket);
  console.log(`${socket.id} has connected`);

  // Propagate the drawing actions
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);  // Send to all other clients
  });

  // Broadcast the clear event to all connected clients
  socket.on("clear", () => {
    console.log("Clear canvas for all tabs");
    io.emit("clear");  // Emit to all connected clients
  });

  // Cleanup when the socket disconnects
  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} is disconnected`);
    connections = connections.filter((con) => con.id !== socket.id);
  });
});

app.use(express.static("public"));

let PORT = process.env.PORT || 8081;
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
