"use client";

import { useEffect, useRef, useState } from "react";
import { Post } from "../../types/PostType";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "../../hooks/fetchData";
import PostLoader from "../../components/loaders/PostLoader";
import AddPost from "../../components/modals/AddPost";
import PostsList from "../../components/PostsList";
import publicAuth from "@/app/lib/publicAuth";
import { formatDate } from "date-fns";

const Posts = () => {
  const { isAuthenticated, user }: any = useAuth();
  const [isRefresh, setIsRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, loading, loadingOnTake, setAddTake }: any = useFetch(
    `/posts`,
    isRefresh,
    true
  );
  const { data: categoriesData, loading: categoriesLoading }: any = useFetch(
    `/categories`,
    false,
    false
  );
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredPosts = data.posts
    ? data.posts.filter(
        (post: any) =>
          post.description
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          post.category.categoryName
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          post.category.slug
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          post?.user?.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          (post?.user === null &&
            "Deleted User"
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase())) ||
          formatDate(post.createdAt, "MMMM dd, yyyy")
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
      )
    : [];

  const handleShowMore = () => {
    setAddTake((prev: any) => prev + 10);
  };

  return (
    <div className="p-4 dark:bg-black mx-auto">
      <div className="flex justify-between flex-wrap items-center gap-5 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
        </div>
        <div className="relative">
          <i className="far fa-magnifying-glass left-3 top-3 absolute text-gray-400"></i>
          <input
            value={searchTerm}
            maxLength={255}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            className="py-2 pl-9 pr-2 rounded-lg active:ring-1 active:ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none border border-gray-400"
            placeholder="Search..."
          />
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

      <div className="py-4 sm:w-full md:w-full lg:w-3/4 xl:w-2/4 mx-auto overflow-hidden">
        {loading ? (
          <PostLoader />
        ) : filteredPosts?.length > 0 ? (
          filteredPosts?.map((post: Post, index: number) => (
            <PostsList key={index} post={post} setIsRefresh={setIsRefresh} />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-64 rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                {searchTerm
                  ? "No Results Found"
                  : data.message || "No Posts Added Yet"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 w-96">
                {searchTerm ? (
                  <>
                    It looks like there are no posts available on your search "
                    <span className="font-bold break-words">{searchTerm}</span>
                    ".
                  </>
                ) : (
                  "It looks like there are no posts available right now. Be patient and check back later!"
                )}
              </p>
            </div>
          </div>
        )}
        {data?.posts && (
          <div className="flex justify-center items-center">
            {loadingOnTake ? (
              <i className="fa-duotone fas fa-spinner-third animate-spin"></i>
            ) : filteredPosts?.length < data?.totalData ? (
              <button
                onClick={handleShowMore}
                type="button"
                className="p-2 bg-blue-500/30 rounded-md hover:bg-blue-500/40 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Show more
              </button>
            ) : filteredPosts?.length > 0 && (
              <p className="text-sm dark:text-gray-500 text-gray-400 font-bold">
                All posts loaded
              </p>
            )}
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
        user={user}
      />
    </div>
  );
};

export default publicAuth(Posts);
