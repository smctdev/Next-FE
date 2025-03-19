"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useSocket from "../hooks/useSocket";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";

const ConversationContext = createContext<any>(undefined);

export const ConversationProvider = ({ children }: any) => {
  const { sentMessage, receiverId }: any = useSocket();
  const { user }: any = useAuth();
  const [isRefresh, setIsRefresh] = useState(false);
  const [hasParams, setHasParams] = useState(false);
  const {
    data,
    loading,
    loadingOnTake,
    setAddTake,
    searchTerm,
    setSearchTerm,
    loadingOnSearch,
    setAddTakeMessages,
    loadingOnTakeMessages,
  }: any = useFetch(
    hasParams && "chats/conversations",
    (user?.id === receiverId && sentMessage) || isRefresh,
    true,
    true
  );
  const pathname = usePathname();

  useEffect(() => {
    pathname === "/chats" && setSearchTerm("");
  }, [pathname]);

  return (
    <ConversationContext.Provider
      value={{
        data,
        loading,
        setIsRefresh,
        loadingOnTake,
        setAddTake,
        setHasParams,
        searchTerm,
        setSearchTerm,
        loadingOnSearch,
        setAddTakeMessages,
        loadingOnTakeMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
