import { Storage } from "@/app/utils/StorageUtils";
import { formatDate } from "date-fns";
import { format } from "path";
import { useState } from "react";

export default function PostsList({ post }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next and previous image navigation
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.image.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + post.image.length) % post.image.length
    );
  };
  return (
    <div className="mb-5">
      <div className="bg-white dark:bg-gray-900 hover:translate-x-1 dark:hover:bg-gray-800 hover:bg-gray-100 hover:scale-[1.01] transition-all duration-300 ease-in-out shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md text-center text-sm font-semibold uppercase tracking-wide">
          {post.category.categoryName}
        </div>

        <div className="shadow-sm p-2">
          {post.image.length !== 0 && (
            <>
              <div className="relative w-full h-48 overflow-hidden rounded-lg">
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
                      key={index}
                      className={`w-2.5 h-2.5 mx-1 rounded-full ${
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
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {post.description}
          </p>
        </div>

        <div className="px-4 py-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-300">
            <span>Posted by: {post.user.name}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            <span>{formatDate(post.createdAt, "MMMM dd, yyyy h:mm:ss a")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
