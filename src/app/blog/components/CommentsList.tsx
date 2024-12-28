import { useState } from "react";
import Image from "./images/Image";

export default function CommentsList({
  comment,
  postUserId,
}: any) {
  const [seeMore, setSeeMore] = useState(false);
  const handleSeeMore = () => {
    if (comment.comment.length > 300) {
      setSeeMore(!seeMore);
    }
  };
  return (
    <div className="w-full px-3 rounded-lg mx-2">
      <div className="flex gap-2 relative pb-6">
        <Image
          avatar={comment.user?.profile_pictures[0]?.avatar}
          alt={comment.user?.name}
          h={8}
          w={8}
        />
        <div className="rounded-xl text-gray-900 dark:text-gray-300 dark:bg-gray-700 bg-gray-300 p-2 w-full">
          <p className="text-md font-bold">
            {comment.user === null ? "Deleted User" : comment.user.name}{" "}
            {comment.userId === postUserId && (
              <span className="text-xs bg-gray-400 text-white dark:bg-gray-600 px-2 py-1 rounded-lg">
                Author
              </span>
            )}
          </p>
          <p className="break-all whitespace-break-spaces">
            <span
              className={`${
                seeMore
                  ? comment.comment.length < 300
                  : comment.comment.length > 300
                  ? "line-clamp-3"
                  : ""
              }`}
            >
              {comment.comment}
            </span>
            {seeMore
              ? comment.comment.length < 300
              : comment.comment.length > 300 && (
                  <>
                    <button
                      type="button"
                      onClick={handleSeeMore}
                      className="text-sm hover:underline text-gray-500 dark:text-gray-400 font-bold"
                    >
                      See more...
                    </button>
                  </>
                )}
          </p>
        </div>
        <div className="absolute -bottom-1 left-[45px]">
          <div className="flex gap-2">
            <button type="button" className="hover:underline">Like</button>
            <button type="button" className="hover:underline">Reply</button>
            <button type="button" className="hover:underline">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
