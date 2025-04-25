
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
