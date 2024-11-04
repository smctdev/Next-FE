"use client";

import { Post } from "@/app/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/app/utils/axiosCall";

export default function posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data.posts);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post: any, index: any) => {
          return (
            <ul key={index}>
              <li>
                <Link href={`/blog/posts/${post.id}`}>{post.title}</Link>
              </li>
            </ul>
          );
        })
      )}
    </>
  );
}
