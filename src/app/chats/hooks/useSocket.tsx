import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sentMessage, setSentMessage] = useState<boolean>(false);
  const [sentPublicMessage, setSentPublicMessage] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("APP-TOKEN");
    const rememberToken = Cookies.get("APP-REMEMBER-TOKEN");
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        token: `${token}:${rememberToken}`,
      },
    });
    socketInstance.on("connect_error", (error) => {
      console.log("Socket connection error:", error);
    });

    setSocket(socketInstance);

    socketInstance.on("sentMessage", (message: boolean) => {
      setSentMessage(message);
    });

    socketInstance.on("sentPublicMessage", (message: boolean) => {
      setSentPublicMessage(message);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = (message: boolean) => {
    socket?.emit("sendMessage", message);
  };

  const sendPublicMessage = (message: boolean) => {
    socket?.emit("sendPublicMessage", message);
  };

  return {
    sentMessage,
    sendMessage,
    sentPublicMessage,
    sendPublicMessage,
  };
};

export default useSocket;
