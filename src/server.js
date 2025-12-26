const http = require("http");
const app = require("./app");
const initSocket = require("./socket/socket");
const { PORT } = require("./config/env");

// Initialize DBs
require("./config/postgres");
require("./config/redis");

// Create HTTP server manually
const server = http.createServer(app);

// Attach WebSocket to same server
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(` Server + WebSocket running on http://localhost:${PORT}`);
});
