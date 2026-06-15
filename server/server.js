require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const { setIO } = require("./services/socketService");

const app = require("./app");

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Register socket instance
setIO(io);
// Listen for client connection
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // Receive events from Python client
  socket.on("agent-progress", (data) => {
    console.log("📩 Agent Update:", data);

    // Broadcast to all React clients
    io.emit("agent-progress", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});