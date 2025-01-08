"use client";

import { useEffect, useRef, useState } from "react";
import ChatContent from "../../components/ChatContent";
import RecentChatContent from "../../components/RecentChatContent";
import Button from "../../components/buttons/Button";
import TextArea from "../../components/inputs/TextArea";
import { useParams } from "next/navigation";
import api from "@/app/lib/axiosCall";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "@/app/context/AuthContext";
import withAuth from "@/app/lib/withAuth";
import Image from "../../components/images/Image";
import ChatHeader from "../../components/loaders/ChatHeader";
import Content from "../../components/loaders/Content";
import useSocket from "../../hooks/useSocket";
import RecentChat from "../../components/loaders/RecentChat";
import Emoji from "@/app/components/emoji-picker/Emoji";
import Link from "next/link";

const Chats = () => {
  const { id }: any = useParams();
  const { sendMessage, sentMessage }: any = useSocket();
  const { data, loading }: any = useFetch(id && `/users/for/seo/${id}`, false);
  const { data: conversationData, loading: loadingConversationData }: any =
    useFetch("chats/conversations", sentMessage);
  const { user }: any = useAuth();
  const [error, setError] = useState<any>("");
  const [formInput, setFormInput] = useState({
    content: "",
    attachment: "",
  });
  const textareaRef = useRef<any>("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const chatContentRef = useRef<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (title: any) => (e: any) => {
    setFormInput((formInput) => ({
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
        textareaRef.current.style.height = "18px";
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

  const handleSendMessage = async () => {
    sendMessage(true);
    if (isEmojiPickerOpen) {
      handleEmojiPickerOpen();
    }
    try {
      const response = await api.post(`chats/sendMessage/${id}`, {
        ...formInput,
      });
      if (response.status === 201) {
        setError("");
        setFormInput({
          content: "",
          attachment: "",
        });
        setTimeout(() => {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }, 500);
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response.data);
    } finally {
      sendMessage(false);
    }
  };

  const handleSendLike = async () => {
    sendMessage(true);
    try {
      const response = await api.post(`chats/sendMessage/${id}`, {
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
      sendMessage(false);
    }
  };

  const messages = conversationData?.conversations?.filter(
    (chat: any) =>
      (chat.senderId === user?.id || chat.receiverId === user?.id) &&
      (chat.senderId === data?.user?.id || chat.receiverId === data?.user?.id)
  );

  const handleEmojiSelect = (emoji: any) => {
    const currentValue = textareaRef.current.value;
    const newValue = currentValue + emoji;

    setFormInput((formInput: any) => ({
      ...formInput,
      content: newValue,
    }));
  };

  const handleEmojiPickerOpen = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleSearchTerm = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white dark:bg-gray-700 border border-r border-gray-200 dark:border-gray-600 flex flex-col md:w-80">
        {/* Profile Header */}
        <div className="border p-4 border-b border-gray-200 dark:border-gray-600">
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
        {/* Recent Chats */}
        <div className="overflow-y-auto">
          {loadingConversationData ? (
            <RecentChat />
          ) : conversationData?.conversations.length > 0 ? (
            conversationData?.conversations.map((convo: any, index: number) => (
              <RecentChatContent
                key={index}
                user={
                  convo.senderId === user?.id ? convo.receiver : convo.sender
                }
                lastMessage={convo?.messages[0]?.content}
                timeSent={convo?.messages[0]?.createdAt}
              />
            ))
          ) : (
            <p className="text-center font-bold text-lg mt-5 break-all px-10 w-20 md:w-full">
              {searchTerm ? `No "${searchTerm}" found` : "No conversations yet"}
            </p>
          )}
        </div>
      </div>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center">
            {loading ? (
              <ChatHeader />
            ) : (
              <>
                <Image
                  avatar={data?.user?.profile_pictures[0]?.avatar}
                  width={10}
                  height={10}
                  alt={data?.user?.name}
                />
                <div className="ml-3">
                  <p className="text-lg font-semibold">{data?.user?.name}</p>

                  <p className="text-sm text-gray-200">Online</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white">
              <i className="fas fa-phone-alt" />
            </button>
            <button className="text-white">
              <i className="fas fa-video" />
            </button>
            <button className="text-white">
              <i className="fas fa-cog" />
            </button>
          </div>
        </div>
        {/* Message Container */}
        <div
          ref={chatContentRef}
          className="flex-1 flex flex-col-reverse gap-4 p-4 overflow-y-auto bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
        >
          {loadingConversationData ? (
            <Content />
          ) : messages && messages.length > 0 ? (
            messages.map((content: any) =>
              content.messages.map((message: any, index: number) => (
                <ChatContent
                  key={index}
                  content={message?.content}
                  avatar={data?.user?.profile_pictures[0]?.avatar}
                  sender={message?.userId === user?.id}
                  name={data?.user?.name}
                  timeSent={message?.createdAt}
                />
              ))
            )
          ) : (
            <p className="text-center mb-20 items-center">
              Start an conversation with <strong>{data?.user?.name}</strong>.{" "}
              Say <strong>HI</strong>{" "}
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
            <div className="relative">
              <TextArea
                textareaRef={textareaRef}
                value={formInput.content}
                onChange={handleInputChange("content")}
                error={error?.content?.message}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                disabled={loading}
              />

              {loading && (
                <p className="rounded-3xl -top-0.5 left-1 absolute h-6 w-full bg-slate-300 dark:bg-slate-400 animate-pulse"></p>
              )}
            </div>
            <div className="absolute right-2 bottom-1">
              <Emoji
                onEmojiSelect={handleEmojiSelect}
                isEmojiPickerOpen={isEmojiPickerOpen}
              >
                <button type="button" onClick={handleEmojiPickerOpen}>
                  <i
                    className={`fas fa-smile ${
                      isEmojiPickerOpen ? "text-yellow-500" : "dark:text-white text-gray-600"
                    } text-xl`}
                  ></i>
                </button>
              </Emoji>
            </div>
          </div>
          <div className="bottom-4 absolute right-4">
            {formInput.content ? (
              <Button
                type="button"
                onClick={handleSendMessage}
                icon="paper-plane-top"
                color="gray-300"
                hoverColor="blue-400"
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
