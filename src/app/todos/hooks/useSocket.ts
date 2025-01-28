import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [todoAdded, setTodoAdded] = useState<boolean>(false);

  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    socketInstance.on("todoAdded", (todo: boolean) => {
      setTodoAdded(todo);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  const addTodo = (todo: boolean) => {
    socket?.emit("addTodo", todo);
  };

  return { todoAdded, addTodo };
};

export default useSocket;
