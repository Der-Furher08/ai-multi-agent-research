import { io } from "socket.io-client";

console.log("⚡ socket.js loaded");

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true,
  timeout: 5000,
});

// Connected
socket.on("connect", () => {
  console.log("🟢 SOCKET CONNECTED:", socket.id);
});

// Connection error
socket.on("connect_error", (error) => {
  console.log("🔴 SOCKET ERROR:", error.message);
});

// Disconnected
socket.on("disconnect", (reason) => {
  console.log("❌ SOCKET DISCONNECTED:", reason);
});

export default socket;