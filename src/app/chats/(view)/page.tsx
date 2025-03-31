"use client";

import { useEffect, useRef, useState } from "react";
import ChatContent from "../components/ChatContent";
import RecentChatContent from "../components/RecentChatContent";
import Button from "../components/buttons/Button";
import TextArea from "../components/inputs/TextArea";
import useFetch from "../hooks/useFetch";
import withAuth from "@/app/lib/withAuth";
import RecentChat from "../components/loaders/RecentChat";
import Emoji from "@/app/components/emoji-picker/Emoji";
import Link from "next/link";
import useSocket from "../hooks/useSocket";
import api from "@/app/lib/axiosCall";
import Content from "../components/loaders/Content";
import { useAuth } from "@/app/context/AuthContext";
import DoubleRecentChat from "../components/loaders/DoubleRecentChat";
import useToastr from "../hooks/Toastr";
import { formatChatTimestamp } from "../utils/formatChatTimestamp";

const Chats = () => {
  const { user }: any = useAuth();
  const [error, setError] = useState<any>("");
  const [formInput, setFormInput] = useState<any>({
    content: "",
    attachment: "",
  });
  const textareaRef = useRef<any>("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { sentPublicMessage, sendPublicMessage }: any = useSocket();
  const {
    data: publicMessagesData,
    loading: publicMessagesDataLoading,
    loadingOnTake,
    setAddTake,
  }: any = useFetch(
    "chat-messages/public-messages",
    sentPublicMessage,
    true,
    false
  );
  const {
    data,
    loading,
    loadingOnTake: loadingOnTakeUsers,
    setAddTake: setAddTakeUsers,
    setSearchTerm,
    searchTerm,
    loadingOnSearch,
  }: any = useFetch("users/to/chat", sentPublicMessage, true, true);
  const chatContentRef = useRef<any>(null);
  const [isSending, setIsSending] = useState(false);
  const emojiPickerRef = useRef<any>(null);
  const loadingOnTakeRef = useRef(loadingOnTake);
  const loadingOnTakeUsersRef = useRef(loadingOnTakeUsers);
  const recentChatRef = useRef<any>(null);
  const totalMessages = publicMessagesData?.messages?.length;
  const totalData = publicMessagesData?.totalData;
  const totalUsers = data?.users?.length;
  const totalUsersData = data?.totalData || 0;
  const [backToBottom, setBackToBottom] = useState(false);
  const searchRef = useRef<any>(null);
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const { showError }: any = useToastr();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as any)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    loadingOnTakeRef.current = loadingOnTake;
    loadingOnTakeUsersRef.current = loadingOnTakeUsers;
  }, [loadingOnTake, loadingOnTakeUsers]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingOnTake &&
          totalMessages < totalData
        ) {
          setAddTake((prev: any) => prev + 10);
        }
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [sentinelRef, loadingOnTake, totalMessages, totalData]);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (chatContentRef.current) {
        const { scrollTop } = chatContentRef.current;

        setBackToBottom(scrollTop < -200);
      }

      if (recentChatRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = recentChatRef.current;
        if (
          scrollHeight - scrollTop <= clientHeight &&
          !loadingOnTakeUsersRef.current &&
          totalUsers < totalUsersData
        ) {
          setAddTakeUsers((prev: any) => prev + 2);
        }
      }
    };

    recentChatRef?.current?.addEventListener("scroll", handleInfiniteScroll);
    chatContentRef?.current?.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      recentChatRef?.current?.removeEventListener(
        "scroll",
        handleInfiniteScroll
      );
      chatContentRef?.current?.removeEventListener(
        "scroll",
        handleInfiniteScroll
      );
    };
  }, [totalUsers, totalUsersData, chatContentRef]);

  const handleBackToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = 0;
    }
  };

  const handleInputChange = (title: any) => (e: any) => {
    setFormInput((formInput: any) => ({
      ...formInput,
      [title]: e.target.value,
    }));
  };

  const handleKeyDown = (e: any) => {
    if (window.innerWidth > 640) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (formInput.content) {
          handleSendMessage();
        }
      }
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (textareaRef.current.scrollHeight > 200) {
      textareaRef.current.style.overflowY = "auto";
    } else {
      textareaRef.current.style.overflowY = "hidden";
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (textareaRef.current) {
      const currentValue = textareaRef.current.value;
      const newValue = currentValue + emoji;
      setFormInput({
        content: newValue,
      });
    }
  };

  const handleEmojiPickerOpen = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleSendMessage = async () => {
    sendPublicMessage(true);
    setIsSending(true);
    textareaRef.current.focus();
    textareaRef.current.style.height = "18px";
    if (isEmojiPickerOpen) {
      handleEmojiPickerOpen();
    }
    try {
      const response = await api.post("chat-messages/send-public-message", {
        ...formInput,
      });
      if (response.status === 201) {
        setFormInput({
          content: "",
          attachment: "",
        });
        setError("");

        setTimeout(() => {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }, 500);
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response.data);
      if (error.response.status === 413) {
        showError("Payload too large. Please try again", "Error");
      }
      setError(error.response.data);
    } finally {
      sendPublicMessage(false);
      setIsSending(false);
    }
  };

  const handleSendLike = async () => {
    sendPublicMessage(true);
    setIsSending(true);
    try {
      const response = await api.post("chat-messages/send-public-message", {
        content: "(y)",
      });

      if (response.status === 201) {
        setTimeout(() => {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }, 500);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      sendPublicMessage(false);
      setIsSending(false);
    }
  };
  const handleSearchTerm = (e: any) => {
    if (searchRef.current) clearTimeout(searchRef.current);

    searchRef.current = setTimeout(() => {
      setSearchTerm(e.target.value);
      setAddTakeUsers(totalUsersData);
    }, 500);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-white dark:bg-gray-700 border border-r border-gray-200 dark:border-gray-600 flex flex-col md:w-80">
        <div className="p-4 border border-b border-gray-200 dark:border-gray-600">
          <div>
            <Link href="/chats">
              <p className="text-2xl font-bold">Chats</p>
            </Link>
          </div>
          <div className="w-20 md:w-full mt-2 rounded-3xl py-3 pl-10 pr-3 relative bg-gray-200 dark:bg-gray-500">
            <input
              type="search"
              className="focus:outline-none bg-transparent w-full"
              placeholder="Search Chats"
              onChange={handleSearchTerm}
            />
            <i className="far fa-magnifying-glass text-gray-300 absolute left-3 top-3.5 text-xl"></i>
          </div>
        </div>
        <div className="overflow-y-auto" ref={recentChatRef}>
          {/* Recent Chats */}
          {loading || loadingOnSearch ? (
            <RecentChat />
          ) : data?.users?.length > 0 ? (
            data?.users?.map((user: any, index: number) => (
              <RecentChatContent
                key={index}
                user={user}
                lastMessage={
                  user?._count?.messages !== 0 &&
                  `Total messages: ${user._count.messages}`
                }
              />
            ))
          ) : (
            <p className="text-center font-bold text-lg mt-5 break-words px-10 w-20 md:w-full">
              {searchTerm ? `No "${searchTerm}" found` : "No conversations yet"}
            </p>
          )}

          {loadingOnTakeUsers && <DoubleRecentChat />}
        </div>
      </div>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-sky-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-lg font-semibold">Public Chats</p>
              <p className="text-sm text-gray-200">
                {data?.totalUsersChatted} people chatted
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white">
              <i className="fas fa-users" />
            </button>
            <button className="text-white">
              <i className="fas fa-info-circle" />
            </button>
            <button className="text-white">
              <i className="fas fa-cog" />
            </button>
          </div>
        </div>
        {/* Message Container */}
        <div
          ref={chatContentRef}
          className="flex-1 flex flex-col-reverse p-4 overflow-y-auto bg-white dark:bg-gray-700 gap-4 border-b border-gray-200 dark:border-gray-600"
        >
          {isSending && <p className="text-end text-sm">Sending...</p>}
          {publicMessagesDataLoading ? (
            <Content />
          ) : publicMessagesData && publicMessagesData?.messages?.length > 0 ? (
            publicMessagesData?.messages?.map((message: any, index: number) => {
              const currentTime = new Date(message.createdAt);
              const prevTime =
                index > 0
                  ? new Date(publicMessagesData?.messages[index - 1].createdAt)
                  : null;

              const shouldShowTime =
                !prevTime ||
                currentTime.getMinutes() !== prevTime.getMinutes() ||
                currentTime.toDateString() !== prevTime.toDateString();

              return (
                <div key={index}>
                  {shouldShowTime && (
                    <div className="flex justify-center text-gray-300 text-xs my-2">
                      {formatChatTimestamp(currentTime)}
                    </div>
                  )}
                  <ChatContent
                    content={message?.content}
                    sender={message?.userId === user?.id}
                    name={message?.sentBy?.name}
                    avatar={message?.sentBy?.profile_pictures[0]?.avatar}
                    timeSent={message?.createdAt}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-center mb-20 items-center">
              Be the first to start a conversation in{" "}
              <strong>Public Chats</strong>. Say <strong>HI</strong>{" "}
              <i className="fas fa-hand-wave text-xl"></i>{" "}
            </p>
          )}
          {loadingOnTake && (
            <div className="relative flex justify-center items-center">
              <i className="fa-duotone fa-solid fa-spinner-third text-center animate-spin"></i>
            </div>
          )}
          <span ref={sentinelRef}></span>
        </div>
        {/* Message Input Area */}
        <div className="bg-white dark:bg-gray-700 px-4 py-2 gap-2 flex items-center relative">
          <div
            className={`absolute left-1/2 bottom-4 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${
              backToBottom ? "opacity-100 -top-20" : "opacity-0 -top-10"
            }`}
          >
            <button
              onClick={handleBackToBottom}
              className="py-3 px-3.5 text-white hover:bg-gray-400/75 hover:dark:bg-gray-500/75 dark:border-gray-400 border-gray-300 flex place-items-center rounded-full border bg-gray-400 dark:bg-gray-500"
              type="button"
            >
              <i className="far fa-arrow-down"></i>
            </button>
          </div>
          <div className="bottom-3 absolute">
            <button type="button">
              <i className="far fa-image text-2xl"></i>
            </button>
          </div>
          <div className="relative w-full py-2 bg-gray-100 dark:bg-gray-500 pr-10 rounded-3xl mx-9">
            <TextArea
              textareaRef={textareaRef}
              value={formInput.content}
              onChange={handleInputChange("content")}
              error={error?.content?.message}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              maxLength={85000}
              disabled={loading}
            />
            <div className="absolute right-2 bottom-1">
              <Emoji
                onEmojiSelect={handleEmojiSelect}
                isEmojiPickerOpen={isEmojiPickerOpen}
                emojiPickerRef={emojiPickerRef}
              >
                <button type="button" onClick={handleEmojiPickerOpen}>
                  <i
                    className={`fas fa-smile ${
                      isEmojiPickerOpen
                        ? "text-yellow-500"
                        : "dark:text-white text-gray-600 hover:dark:text-gray-400 hover:text-gray-500"
                    } text-xl`}
                  ></i>
                </button>
              </Emoji>
            </div>
          </div>
          <div className="bottom-4 absolute right-4">
            {formInput.content ? (
              <Button
                onClick={handleSendMessage}
                type="button"
                icon="paper-plane-top"
                color="blue-500"
                hoverColor="blue-600"
              />
            ) : (
              <Button
                type="button"
                onClick={handleSendLike}
                icon="thumbs-up"
                color="blue-500"
                hoverColor="blue-600"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Chats);
