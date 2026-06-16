import express from "express";
import http from "http";
import cors from "cors";
import axios from "axios";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

console.log("🚀 Node Socket Server Running");

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("research", async (topic) => {
    console.log("📩 Topic:", topic);

    try {
      // call fastapi
      const response = await axios.post(
        "https://YOUR-AI-SERVICE.onrender.com/research",
        { topic }
      );

      const text = JSON.stringify(response.data.data);

      // 🔥 STREAM SIMULATION
      for (let i = 0; i < text.length; i++) {
        await new Promise((r) => setTimeout(r, 10));
        socket.emit("research-stream", text[i]);
      }

      socket.emit("research-end", "DONE");
    } catch (err) {
      console.log(err.message);
      socket.emit("research-error", "Failed to generate research");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ disconnected");
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("✅ Server started");
});