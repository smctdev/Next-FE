import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { PayloadInterface } from "../types/PayloadInterface";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sentMessage, setSentMessage] = useState<boolean>(false);
  const [sentPublicMessage, setSentPublicMessage] = useState<boolean>(false);
  const [receiverId, setReceiverId] = useState<any>("");
  const [isSeenSentMessage, setIsSeenSentMessage] = useState(false);
  const [userTypingInfo, setUserTypingInfo] = useState<any>(null);
  const typingTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

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

    socketInstance.on(
      "isSeenForSentMessage",
      (isSeenForSentMessage: boolean) => {
        setIsSeenSentMessage(isSeenForSentMessage);
      }
    );

    socketInstance.on("sentPublicMessage", (toRefresh: boolean) => {
      setSentPublicMessage(toRefresh);
    });

    socketInstance.on("userTypeToChat", ({ chatId, user }: any) => {
      if (chatId || !user?.id) return;

      if (typingTimeouts.current[user.id]) {
        clearTimeout(typingTimeouts.current[user.id]);
      }

      setUserTypingInfo((prev: any) => ({
        ...prev,
        [user.id]: user,
      }));

      typingTimeouts.current[user.id] = setTimeout(() => {
        setUserTypingInfo((prev: any) => {
          const updated = { ...prev };
          delete updated[user.id];
          return updated;
        });
      }, 500);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [typingTimeouts]);

  const sendMessage = ({
    toRefresh,
    receiverId,
    isSeenForSentMessage,
  }: PayloadInterface) => {
    socket?.emit("sendMessage", {
      toRefresh,
      receiverId,
      isSeenForSentMessage,
    });
  };

  const sendPublicMessage = (toRefresh: boolean) => {
    socket?.emit("sendPublicMessage", toRefresh);
  };

  const userTyping = ({ chatId, user }: any) => {
    socket?.emit("userTyping", { chatId, user });
  };

  return {
    sentMessage,
    sendMessage,
    sentPublicMessage,
    sendPublicMessage,
    receiverId,
    isSeenSentMessage,
    userTyping,
    userTypingInfo,
  };
};

export default useSocket;
