import { useState } from "react";
import socket from "../socket";

export default function useResearch() {
  const [loading, setLoading] = useState(false);
  const [research, setResearch] = useState("");
  const [error, setError] = useState("");

  const generateResearch = (topic) => {
    setLoading(true);
    setResearch("");
    setError("");

    // IMPORTANT: THIS MUST MATCH BACKEND EVENT NAME
    socket.emit("research", topic);
  };

  // listen once
  socket.on("research-stream", (chunk) => {
    setResearch((prev) => prev + chunk);
    setLoading(false);
  });

  socket.on("research-end", () => {
    setLoading(false);
  });

  socket.on("research-error", (msg) => {
    setError(msg);
    setLoading(false);
  });

  return {
    loading,
    research,
    error,
    generateResearch,
  };
}