import { useAuth } from "@/app/context/AuthContext";
import { Storage } from "@/app/utils/StorageUtils";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import dateFormat from "../utils/dateFormat";

export default function PostsList({ post }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user }: any = useAuth();
  const [countLike, setCountLike] = useState(0);

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

  const handleLike = () => {
    setCountLike(countLike + 1);
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
          <div className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
            <span>Author: </span>
            <span className="p-2 bg-gray-200 text-gray-600 dark:text-white dark:bg-gray-700 rounded-lg font-bold text-xs flex gap-1 items-center">
              {post?.user?.profile_pictures?.length === 0 ||
              post?.user === null ? (
                <>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    className="w-5 h-5 rounded-full"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img
                    src={Storage(post?.user?.profile_pictures[0]?.avatar)}
                    className="w-5 h-5 rounded-full"
                    alt=""
                  />
                </>
              )}{" "}
              {post?.user?.name === user?.name
                ? "You"
                : post?.user === null
                ? "Deleted User"
                : post?.user?.name}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
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
              • <small>{dateFormat(post.createdAt)}</small>
            </span>
          </div>
        </div>
        {countLike === 0 ? (
          ""
        ) : (
          <div className="flex justify-between px-2 border-t border-gray-200 dark:border-gray-700 py-2">
            <span>{countLike}</span>
            <span></span>
            <span></span>
          </div>
        )}
        <div className="border-t flex justify-between items-center border-gray-200 dark:border-gray-700 py-4 px-3">
          <div>
            <button type="button" onClick={handleLike}>
              <i className="far fa-thumbs-up"></i> Like
            </button>
          </div>
          <div>
            <button>
              <i className="far fa-comment"></i> Comment
            </button>
          </div>
          <div>
            <button>
              <i className="far fa-share"></i> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
