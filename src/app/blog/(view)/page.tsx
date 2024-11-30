"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import AddCategory from "../components/modals/AddCategory";
import useFetch from "../hooks/fetchData";
import LoadingLoaders from "@/app/components/loaders/LoadingLoaders";
import CategoryLoader from "../components/loaders/CategoryLoader";

export default function Blog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const {
    isAuthenticated,
    loading: authLoading,
    hasHigherRole,
  }: any = useAuth();
  const { data, loading, error }: any = useFetch("/categories", isRefresh);
  const [seemore, setSeemore] = useState<any>({});

  if (authLoading) {
    return <LoadingLoaders />;
  }

  const handleOpenModal = async () => {
    setIsOpen(true);
  };

  const handleSeemore = (id: number) => {
    setSeemore((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mx-auto p-4 dark:bg-black">
      {isAuthenticated && hasHigherRole && (
        <div className="flex justify-end items-center">
          <button
            className="bg-blue-600 text-white px-4 text-sm py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={handleOpenModal}
          >
            <i className="far fa-plus"></i> Add Category
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 my-8">
        {loading ? (
          <CategoryLoader />
        ) : data.categories?.length > 0 ? (
          data.categories.map((post: any, index: number) => (
            <div
              key={index}
              className="bg-white relative p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
            >
              <div className="h-auto min-h-32 overflow-hidden mb-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                  {post.categoryName}
                </h2>
                <div className="relative">
                  <p
                    className={`text-gray-600 mb-6 dark:text-white break-words ${
                      !seemore[post.id] ? "line-clamp-3" : ""
                    }`}
                    title={post.description}
                  >
                    {post.description}
                  </p>
                  {post.description.length > 100 && (
                    <button
                      className="text-gray-500 text-sm absolute -bottom-6 left-0"
                      onClick={() => handleSeemore(post.id)}
                    >
                      {!seemore[post.id] ? "See more..." : "See less..."}
                    </button>
                  )}
                </div>
              </div>
              <Link
                className="text-blue-600 hover:text-blue-800 absolute bottom-3"
                href={`/blog/posts/${post.slug}`}
              >
                Read more <i className="far fa-arrow-right text-xs"></i>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-64 rounded-lg shadow-lg">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                {data.message || "No Blog Categories Added Yet"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                It looks like there are no categories available right now. Be
                patient and check back later!
              </p>
            </div>
          </div>
        )}
      </div>
      <AddCategory
        isOpen={isOpen}
        onClose={setIsOpen}
        setIsRefresh={setIsRefresh}
      />
    </div>
  );
}
