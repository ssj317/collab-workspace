const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  //  Socket authentication
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Authentication error"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // { userId }
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(" Socket connected:", socket.user.userId);

    //  Join project/workspace
    socket.on("join-project", ({ projectId }) => {
      socket.join(projectId);

      // broadcast to others
      socket.to(projectId).emit("user-joined", {
        userId: socket.user.userId,
      });

      console.log(` User joined project ${projectId}`);
    });

    //  Leave project
    socket.on("leave-project", ({ projectId }) => {
      socket.leave(projectId);

      socket.to(projectId).emit("user-left", {
        userId: socket.user.userId,
      });

      console.log(` User left project ${projectId}`);
    });

    // Mock file change event
    socket.on("file-change", ({ projectId }) => {
      socket.to(projectId).emit("file-change", {
        filePath: "index.js",
        content: "// mocked file content",
        updatedBy: socket.user.userId,
      });
    });

    // Mock cursor/activity update
    socket.on("cursor-update", ({ projectId }) => {
      socket.to(projectId).emit("cursor-update", {
        userId: socket.user.userId,
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
      });
    });

    socket.on("disconnect", () => {
      console.log(" Socket disconnected:", socket.user.userId);
    });
  });
}

module.exports = initSocket;
