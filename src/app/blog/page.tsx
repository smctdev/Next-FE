"use client";

import { useState } from "react";
import Link from "next/link";
import AddCategory from "@/app/components/Modals/Category/AddCategory";

export default function Blog() {
  const [isOpen, setIsOpen] = useState(false);
  const posts = [
    {
      title: "Understanding React",
      description: "A deep dive into React fundamentals and advanced concepts.",
      slug: "understanding-react",
    },
    {
      title: "Next.js 13 New Features",
      description: "Exploring the exciting features introduced in Next.js 13.",
      slug: "nextjs-13-new-features",
    },
    {
      title: "JavaScript ES6 Features",
      description: "A comprehensive guide to ES6 features in JavaScript.",
      slug: "javascript-es6-features",
    },
  ];

  const handleOpenModal = async () => {
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-4 dark:bg-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-8">Blog Page</h1>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={handleOpenModal}
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 dark:text-white">
              {post.description}
            </p>
            <Link
              className="text-blue-600 hover:text-blue-800"
              href={`/blog/posts/${post.slug}`}
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
      <AddCategory isOpen={isOpen} onClose={setIsOpen} />
    </div>
  );
}
