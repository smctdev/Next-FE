import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { PayloadInterface } from "../types/PayloadInterface";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sentMessage, setSentMessage] = useState<boolean>(false);
  const [sentPublicMessage, setSentPublicMessage] = useState<boolean>(false);
  const [receiverId, setReceiverId] = useState<any>("");

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

    socketInstance.on("connect", () => {
      setSocket(socketInstance);
    });

    socketInstance.on("sentMessage", (toRefresh: boolean) => {
      setSentMessage(toRefresh);
    });

    socketInstance.on("receiverId", (receiverId: string) => {
      setReceiverId(receiverId);
    });

    socketInstance.on("sentPublicMessage", (toRefresh: boolean) => {
      setSentPublicMessage(toRefresh);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = ({ toRefresh, receiverId }: PayloadInterface) => {
    socket?.emit("sendMessage", { toRefresh, receiverId });
  };

  const sendPublicMessage = (toRefresh: boolean) => {
    socket?.emit("sendPublicMessage", toRefresh);
  };

  return {
    sentMessage,
    sendMessage,
    sentPublicMessage,
    sendPublicMessage,
    receiverId,
  };
};

export default useSocket;
