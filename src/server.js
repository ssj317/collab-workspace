const http = require("http");
const app = require("./app");
const initSocket = require("./socket/socket");
const { PORT } = require("./config/env");
const connectMongo = require("./config/mongo");
const requestLogger = require("./middlewares/requestLogger");

// DBs (Docker / local only)
require("./config/postgres");
require("./config/redis");
connectMongo();


app.use(requestLogger);

// create server
const server = http.createServer(app);

// attach sockets
initSocket(server);

server.listen(PORT, () => {
  console.log(` Server + WebSocket running on http://localhost:${PORT}`);
});
