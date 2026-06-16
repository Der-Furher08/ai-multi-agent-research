import { useEffect, useState } from "react";
import socket from "../socket";

export default function useSocket() {
  const [connected, setConnected] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("research-stream", (chunk) => {
      setProgress((prev) => prev + chunk);
    });

    socket.on("research-end", () => {
      console.log("stream finished");
    });

    socket.on("research-error", (msg) => {
      console.log("error:", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("research-stream");
      socket.off("research-end");
      socket.off("research-error");
    };
  }, []);

  return { connected, progress, setProgress };
}