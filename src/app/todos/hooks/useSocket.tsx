import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    socketInstance.on("todoAdded", (todo: string) => {
      setTodos((prevTodos) => [...prevTodos, `New Todo: ${todo}`]);
    });

    socketInstance.on("todoRemoved", (todoId: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo !== todoId));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  const sendTodo = (todo: string) => {
    socket?.emit("addTodo", todo);
  };

  const removeTodo = (todoId: string) => {
    socket?.emit("removeTodo", todoId);
  };

  return { todos, sendTodo, removeTodo };
};

export default useSocket;
