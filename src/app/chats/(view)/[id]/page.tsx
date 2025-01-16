"use client";

import { useEffect, useRef, useState } from "react";
import ChatContent from "../../components/ChatContent";
import RecentChatContent from "../../components/RecentChatContent";
import Button from "../../components/buttons/Button";
import TextArea from "../../components/inputs/TextArea";
import { useParams, useRouter } from "next/navigation";
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
import { useConversation } from "../../context/conversationContext";

const Chats = () => {
  const { id }: any = useParams();
  const { sendMessage }: any = useSocket();
  const { data, loading }: any = useFetch(
    id && `/users/for/seo/${id}`,
    false,
    false
  );
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
  const navigate = useRouter();
  const [isSending, setIsSending] = useState(false);
  const emojiPickerRef = useRef<any>(null);
  const {
    data: convos,
    loading: loadingConvos,
    setIsRefresh,
    loadingOnTake,
    setAddTake,
  }: any = useConversation();
  const loadingOnTakeRef = useRef(loadingOnTake);
  const [backToBottom, setBackToBottom] = useState(false);

  const getDataPerUser = convos?.conversations?.filter(
    (chat: any) =>
      (chat.senderId === user?.id || chat.receiverId === user?.id) &&
      (chat.senderId === data?.user?.id || chat.receiverId === data?.user?.id)
  );

  const totalMessages =
    (getDataPerUser && getDataPerUser[0]?.messages?.length) || 0;
  const totalData =
    (getDataPerUser && getDataPerUser[0]?._count?.messages) || 0;

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
  }, [loadingOnTake]);

  useEffect(() => {
    const handleInfinitScroll = () => {
      if (
        chatContentRef.current &&
        !loadingOnTakeRef.current &&
        totalMessages < totalData
      ) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContentRef.current;
        if (scrollTop + scrollHeight - 1 <= clientHeight) {
          setAddTake((prev: any) => prev + 10);
        }
      }

      if (chatContentRef.current) {
        const { scrollTop } = chatContentRef.current;

        setBackToBottom(scrollTop < -200);
      }
    };
    chatContentRef?.current?.addEventListener("scroll", handleInfinitScroll);
    return () => {
      chatContentRef?.current?.removeEventListener(
        "scroll",
        handleInfinitScroll
      );
    };
  }, [totalMessages, totalData]);

  const handleBackToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (data.statusCode === 404) {
      navigate.back();
    }
  }, [data]);

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
    sendMessage({
      toRefresh: true,
      receiverId: id,
    });
    setIsSending(true);
    setIsRefresh(true);
    textareaRef.current.focus();
    textareaRef.current.style.height = "18px";
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
      sendMessage({
        toRefresh: false,
        receiverId: "",
      });
      setIsSending(false);
      setIsRefresh(false);
    }
  };

  const handleSendLike = async () => {
    sendMessage({
      toRefresh: true,
      receiverId: id,
    });
    setIsSending(true);
    setIsRefresh(true);
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
      sendMessage({
        toRefresh: false,
        receiverId: "",
      });
      setIsSending(false);
      setIsRefresh(false);
    }
  };

  const messages = convos?.conversations?.filter(
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
          {loadingConvos ? (
            <RecentChat />
          ) : convos?.conversations && convos?.conversations.length > 0 ? (
            convos?.conversations.map((convo: any, index: number) => (
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
            <p className="text-center font-bold text-lg mt-5 break-words px-10 w-20 md:w-full">
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
                  <p className="text-lg font-semibold">{data?.user?.name || "Anonymous"}</p>

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
          {isSending && <p className="text-end text-sm">Sending...</p>}
          {loading ? (
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

          {loadingOnTake && (
            <div className="relative flex justify-center items-center">
              <i className="fa-duotone fa-solid fa-spinner-third text-center animate-spin"></i>
            </div>
          )}
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
                type="button"
                onClick={handleSendMessage}
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
