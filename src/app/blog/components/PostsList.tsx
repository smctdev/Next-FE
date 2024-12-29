import { useAuth } from "@/app/context/AuthContext";
import { Storage } from "@/app/utils/StorageUtils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dateFormat from "../utils/dateFormat";
import PostButton from "./buttons/PostButton";
import api from "@/app/lib/axiosCall";
import { useRouter } from "next/navigation";
import TextAreaComment from "./inputs/TextAreaComment";
import CommentsList from "./CommentsList";
import Image from "./images/Image";

export default function PostsList({ post, setIsRefresh }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState<any>({});
  const [comment, setComment] = useState("");
  const [error, setError] = useState<any>("");
  const { user }: any = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const textareaRef = useRef<any>("");

  const isLiked = post.likes.some((liker: any) => liker.userId === user?.id);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.image.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + post.image.length) % post.image.length
    );
  };

  const imageIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleLike = (postId: number) => async () => {
    setIsRefresh(true);
    try {
      await api.post(`/posts/like/${postId}`, {});
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsRefresh(false);
    }
  };

  const handleOpenComment = (postId: number) => async () => {
    setIsCommentOpen((isCommentOpen: any) => ({
      ...isCommentOpen,
      [postId]: true,
    }));
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    setIsOpen(true);
  };

  const handleNavigate = () => {
    router.push("/login");
  };

  const handleSubmitComment = (postId: any) => async () => {
    setIsRefresh(true);
    textareaRef.current.focus();
    try {
      const response = await api.post(`/comments/${postId}`, {
        comment,
      });

      if (textareaRef.current && response.status === 201) {
        textareaRef.current.style.height = "auto";
        setComment("");
        setError("");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response.data);
    } finally {
      setIsRefresh(false);
    }
  };

  const handleKeyDown = (postId: any) => (e: any) => {
    if (window.innerWidth > 640) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (comment) {
          handleSubmitComment(postId)();
        }
      }
    }
  };

  const handleInputChange = (e: any) => {
    setComment(e.target.value);
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

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="mb-5">
      <div
        className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 hover:bg-gray-100 shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
        data-aos="fade-up"
      >
        <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md text-center text-sm font-semibold uppercase tracking-wide">
          <Link
            className="hover:underline"
            href={`/blog/posts/${post.category.slug}`}
          >
            {post.category.categoryName}
          </Link>
        </div>

        <div className="shadow-sm p-2">
          {post.image.length !== 0 && (
            <>
              <div className="relative w-full h-[450px] overflow-hidden rounded-lg">
                <div
                  className="w-full h-full flex transition-transform duration-300"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {post.image.map((image: any, index: number) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full h-full relative"
                    >
                      <img
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                        src={Storage(image)}
                        alt={`Post Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                {post.image.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 dark:bg-black dark:bg-opacity-50 p-2 bg-gray-200 rounded hover:bg-opacity-75"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 dark:bg-black dark:bg-opacity-50 p-2 bg-gray-200 rounded hover:bg-opacity-75"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </>
                )}
              </div>

              {post.image.length > 1 && (
                <div className="flex justify-center mt-2">
                  {post.image.map((_: any, index: any) => (
                    <div
                      onClick={() => imageIndex(index)}
                      key={index}
                      className={`w-2.5 h-2.5 mx-1 rounded-full cursor-pointer hover:bg-blue-500 ${
                        currentIndex === index ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-4 py-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {post.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-break-spaces">
            {post.description}
          </p>
        </div>

        <div className="p-3 flex justify-between gap-2 items-center border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-300 flex items-center relative">
            <span className="absolute top-1 left-2 px-1 rounded-md text-xs text-white bg-blue-500/75">
              Author
            </span>
            <span className="px-2 pb-2 pt-6 bg-gray-200 text-gray-900 dark:text-gray-200 dark:bg-gray-700 rounded-lg font-bold text-xs flex gap-1 items-center">
              <Image
                avatar={post?.user?.profile_pictures[0]?.avatar}
                alt={post?.user?.name}
                h={5}
                w={5}
              />{" "}
              <span className="truncate " title={post?.user?.name}>
                {post?.user?.name === user?.name
                  ? "You"
                  : post?.user === null
                  ? "Deleted User"
                  : post?.user?.name === null
                  ? "Anonymous"
                  : post?.user?.name}
              </span>
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300 truncate">
            <span>
              {post.publishedAs === "public" ? (
                <>
                  <i className="far fa-earth-americas"></i>
                </>
              ) : post.publishedAs === "private" ? (
                <>
                  <i className="far fa-lock"></i>
                </>
              ) : post.publishedAs === "friends" ? (
                <>
                  <i className="far fa-user-group"></i>
                </>
              ) : (
                <>
                  <i className="far fa-signs-posts"></i>
                </>
              )}{" "}
              •{" "}
              <small title={dateFormat(post.createdAt)}>
                {dateFormat(post.createdAt)}
              </small>
            </span>
          </div>
        </div>
        {(post.likes.length || post.comments.length) > 0 && (
          <div className="flex justify-between text-center p-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 items-center">
              {post.likes.length > 0 && (
                <>
                  <i className="fas fa-thumbs-up text-blue-500"></i>
                  <span>{post.likes.length}</span>
                </>
              )}
              <div className="flex gap-1 items-center">
                {post.likes.length > 0 &&
                  post.likes
                    .sort((a: any, b: any) => {
                      if (a.userId === user?.id) {
                        return -1;
                      }
                      if (b.userId === user?.id) {
                        return 1;
                      }
                      return 0;
                    })
                    .slice(0, isLiked ? 2 : 1)
                    .map((liker: any, index: number) => (
                      <span
                        key={index}
                        className="truncate sm:max-w-full max-w-[100px]"
                        title={liker.user.name}
                      >
                        {liker.userId === user?.id
                          ? `You${post.likes.length > 1 ? "," : ""}`
                          : liker.user.name === null
                          ? "Anonymous"
                          : `${liker.user.name}`}
                      </span>
                    ))}
                {isLiked
                  ? post.likes.length - 1 > 1 && (
                      <span className="sm:max-w-full max-w-[100px]">
                        and others
                      </span>
                    )
                  : post.likes.length > 1 && (
                      <span className="sm:max-w-full max-w-[100px]">
                        and others
                      </span>
                    )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                {post.comments.length > 0 && (
                  <>
                    <i className="far fa-comment"></i>
                    <span>2</span>
                  </>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <i className="far fa-share"></i>
                <span>3</span>
              </div>
            </div>
          </div>
        )}
        <div className="border-t flex justify-between items-center border-gray-200 dark:border-gray-700 py-1">
          <PostButton
            type="button"
            onClick={user ? handleLike(post.id) : handleNavigate}
            icon="thumbs-up"
            label="Like"
            isLiked={isLiked}
          />
          <PostButton
            type="button"
            icon="comment"
            label="Comment"
            onClick={user ? handleOpenComment(post.id) : handleNavigate}
          />
          <PostButton type="button" icon="share" label="Share" />
        </div>
        {(isCommentOpen[post.id] || post.comments.length > 0) && (
          <div className="border-t flex justify-between items-center flex-col gap-2 border-gray-200 dark:border-gray-700 py-5">
            {post.comments.length > 0 &&
              post.comments
                .slice(0, 1)
                .map((comment: any, index: number) => (
                  <CommentsList
                    key={index}
                    comment={comment}
                    postUserId={post.userId}
                  />
                ))}
            {(isCommentOpen[post.id] || post.comments.length > 0) && user && (
              <div className="flex gap-2 w-full px-3">
                <Image
                  avatar={user?.profile_pictures[0]?.avatar}
                  alt={user?.name}
                  h={8}
                  w={8}
                />
                <div className="w-full px-3 pt-2 dark:bg-gray-700 bg-gray-200 mx-2 rounded-3xl">
                  <TextAreaComment
                    ref={textareaRef}
                    onClick={handleClickOpen}
                    value={comment}
                    error={error.comment?.message}
                    onKeyDown={handleKeyDown(post.id)}
                    onChange={handleInputChange}
                    onInput={handleInput}
                    placeholder={`Comment as ${user?.name}`}
                    rows={1}
                  />

                  {isOpen && (
                    <div className="flex justify-between pb-2 items-center transition-all duration-300 ease-in-out">
                      <div>
                        <i className="far fa-smile"></i>
                      </div>
                      <div>
                        <button
                          type="button"
                          disabled={!comment}
                          onClick={
                            comment ? handleSubmitComment(post.id) : undefined
                          }
                          className={`${
                            !comment
                              ? "cursor-not-allowed text-gray-400 dark:text-gray-500"
                              : "text-blue-500 dark:text-blue-300 hover:dark:bg-gray-600 hover:bg-gray-300"
                          } rounded-full px-2 py-1`}
                        >
                          <i className="far fa-paper-plane-top"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
