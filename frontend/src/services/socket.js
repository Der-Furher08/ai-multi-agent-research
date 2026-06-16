import { io } from "socket.io-client";

console.log("⚡ socket.js loaded");

const socket = io("https://ai-multi-agent-research-backend.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
  timeout: 10000,
});

socket.on("connect", () => {
  console.log("🟢 SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (error) => {
  console.log("🔴 SOCKET ERROR:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("❌ SOCKET DISCONNECTED:", reason);
});

export default socket;