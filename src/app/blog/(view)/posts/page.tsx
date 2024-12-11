"use client";

import { useEffect, useRef, useState } from "react";
import { Post } from "../../types/PostType";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "../../hooks/fetchData";
import PostLoader from "../../components/loaders/PostLoader";
import AddPost from "../../components/modals/AddPost";
import PostsList from "../../components/PostsList";
import publicAuth from "@/app/lib/publicAuth";

const Posts = () => {
  const { isAuthenticated }: any = useAuth();
  const [isRefresh, setIsRefresh] = useState(false);
  const { data, loading }: any = useFetch(`/posts`, isRefresh);
  const { data: categoriesData, loading: categoriesLoading }: any = useFetch(
    `/categories`,
    isRefresh
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 dark:bg-black mx-auto">
      <div className="flex justify-between mt-2">
        <div>
          <h1 className="text-2xl font-bold mb-4">Posts</h1>
        </div>
        {isAuthenticated && (
          <div>
            <button
              ref={buttonRef}
              type="button"
              onClick={handleOpenModal}
              className="px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out text-white rounded-md active:bg-blue-700"
            >
              <i className="far fa-plus"></i> Add Post
            </button>
          </div>
        )}
      </div>
      <hr />

      <div className="py-4 md:px-52 overflow-x-hidden">
        {loading ? (
          <PostLoader />
        ) : data.posts?.length > 0 ? (
          data.posts.map((post: Post, index: number) => (
            <PostsList key={index} post={post} />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-64 rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                {data.message || "No Posts Added Yet"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                It looks like there are no posts available right now. Be patient
                and check back later!
              </p>
            </div>
          </div>
        )}
      </div>
      <AddPost
        onClose={setIsOpen}
        isOpen={isOpen}
        setIsRefresh={setIsRefresh}
        modalRef={modalRef}
        categories={categoriesData.categories}
        categoriesLoading={categoriesLoading}
      />
    </div>
  );
};

export default publicAuth(Posts);
