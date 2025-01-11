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

const Chats = () => {
  const { user }: any = useAuth();
  const [error, setError] = useState<any>("");
  const [formInput, setFormInput] = useState<any>({
    content: "",
    attachment: "",
  });
  const textareaRef = useRef<any>("");
  const [isRefresh, setIsRefresh] = useState(false);
  const { data, loading }: any = useFetch("users/to/chat", isRefresh);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { sentPublicMessage, sendPublicMessage }: any = useSocket();
  const { data: publicMessagesData, loading: publicMessagesDataLoading } =
    useFetch("chat-messages/public-messages", sentPublicMessage);
  const [searchTerm, setSearchTerm] = useState("");
  const chatContentRef = useRef<any>(null);
  const [isSending, setIsSending] = useState(false);
  const emojiPickerRef = useRef<any>(null);

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
    const handleInfinitScroll = () => {
      if (chatContentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
        chatContentRef.current;
        if (scrollTop + scrollHeight === clientHeight + 1) {
          console.log('reached');
        }
      }
    };
    chatContentRef?.current?.addEventListener("scroll", handleInfinitScroll);
    return () => {
      chatContentRef?.current?.removeEventListener("scroll", handleInfinitScroll);
    };
  }, []);

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
    setSearchTerm(e.target.value);
  };
  const filteredUser = data.users
    ? data.users.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
        <div className="overflow-y-auto">
          {/* Recent Chats */}
          {loading ? (
            <RecentChat />
          ) : filteredUser.length > 0 ? (
            filteredUser.map((user: any, index: number) => (
              <RecentChatContent key={index} user={user} />
            ))
          ) : (
            <p className="text-center font-bold text-lg mt-5 break-words px-10 w-20 md:w-full">
              {searchTerm ? `No "${searchTerm}" found` : "No conversations yet"}
            </p>
          )}
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
                {data?.users?.length} people to chat
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
          ) : publicMessagesData && publicMessagesData.length > 0 ? (
            publicMessagesData.map((message: any, index: number) => (
              <ChatContent
                key={index}
                content={message?.content}
                sender={message?.userId === user?.id}
                name={message?.sentBy?.name}
                avatar={message?.sentBy?.profile_pictures[0]?.avatar}
                timeSent={message?.createdAt}
              />
            ))
          ) : (
            <p className="text-center mb-20 items-center">
              Be the first to start a conversation in{" "}
              <strong>Public Chats</strong>. Say <strong>HI</strong>{" "}
              <i className="fas fa-hand-wave text-xl"></i>{" "}
            </p>
          )}
        </div>
        {/* Message Input Area */}
        <div className="bg-white dark:bg-gray-700 px-4 py-2 gap-2 flex items-center relative">
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
