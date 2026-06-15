import { useEffect, useState } from "react";
import socket from "../services/socket";

function useSocket() {

  console.log("🚀 useSocket Hook Running");

  const [connected, setConnected] = useState(false);
  const [progress, setProgress] = useState([]);

  useEffect(() => {

    const handleConnect = () => {
      console.log("🟢 Connected in hook:", socket.id);
      setConnected(true);
    };


    const handleDisconnect = () => {
      console.log("🔴 Disconnected from hook");
      setConnected(false);
    };


    const handleProgress = (data) => {
      console.log("🤖 Agent Progress:", data);

      setProgress((prev) => [
        ...prev,
        data
      ]);
    };


    socket.on("connect", handleConnect);

    socket.on("disconnect", handleDisconnect);

    socket.on("agent-progress", handleProgress);


    // If already connected
    if (socket.connected) {
      setConnected(true);
    }


    return () => {
      socket.off("connect", handleConnect);

      socket.off("disconnect", handleDisconnect);

      socket.off("agent-progress", handleProgress);
    };

  }, []);


  const clearProgress = () => {
    setProgress([]);
  };


  return {
    connected,
    progress,
    clearProgress
  };
}


export default useSocket;